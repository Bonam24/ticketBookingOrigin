'use client';

import { useState, useEffect } from "react";
import styles from '../booking/styles/style2.module.css';
import seatData from "../data/theatre2.json";
import { jsPDF } from "jspdf";
import QRCode from 'qrcode';

export default function SeatMap({ eventType, eventLocation, ename, eTime }) {
    const seatLayers = [
        { id: 1, seats: 12, radius: 100 },
        { id: 2, seats: 16, radius: 150 },
        { id: 3, seats: 22, radius: 200 },
    ];

    const [seats, setSeats] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [eventName, setEventName] = useState("");

    useEffect(() => {
        const processedSeats = seatData.map(seat => {
            const eventData = seat[eventType];
            return {
                ...seat,
                isBooked: eventData.booked,
                eventName: eventData.name
            };
        });
        setSeats(processedSeats);

        if (seatData.length > 0) {
            const firstEvent = seatData[0][eventType];
            setEventName(firstEvent.name);
        }
    }, [eventType]);

    const handleSeatClick = (id) => {
        const seat = seats.find(seat => seat.id === id);
        if (!seat.isBooked) {
            setSelectedSeat(id);
            setFormVisible(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const downloadPDF = (seatNumber, email) => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString(); // Get current date in MM/DD/YYYY format
    
        // Add watermark (Eventify text across the page)
        doc.setTextColor(150); // Light gray color for watermark
        doc.setFontSize(80); // Large font for watermark
        doc.text('Eventify', 45, 150, { angle: 45, opacity: 0.1 }); // Diagonal watermark
    
        // Add title and header, shifted more inside
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0); // Black text
        doc.text(`Booking Confirmation for ${ename}`, 30, 50); // Shifted inside
    
        // Add details to the PDF, shifted more inside
        doc.setFontSize(14);
        doc.text(`Name: ${formData.name}`, 30, 70); // Shifted inside
        doc.text(`Seat Number: ${seatNumber}`, 30, 80); // Shifted inside
        doc.text(`Event Name: ${ename} Time:${eTime}`, 30, 90); // Shifted inside
        doc.text(`Email: ${email}`, 30, 100); // Shifted inside
        doc.text(`Date: ${currentDate}`, 30, 110); // Shifted inside
        
    
        // Create a double rectangular border (orange outer, yellow inner) with left side pushed inside
        // Outer border (orange) with left side pushed inside
        doc.setDrawColor(255, 165, 0); // Orange color
        doc.setLineWidth(5); 
        doc.rect(5, -5, 200, 300); 
    
        // Inner border (yellow) with adjusted left side
        doc.setDrawColor(255, 255, 0); 
        doc.setLineWidth(3); 
        doc.rect(10, 0, 190, 290); 
    
        // Add design elements 
        doc.setDrawColor(0); // Black color for the rectangle
        doc.setLineWidth(1);
        doc.rect(10, 110, 190, 20); // Add a box around the QR code section
        doc.text("QR Code for Event", 75, 120); // Label for the QR code
    
        // Generate QR Code data URL (encode seat number and email)
        const qrData = `Seat: ${seatNumber}, Email: ${email}, Date: ${currentDate},Event Name: ${ename}`;
    
        QRCode.toDataURL(qrData, (err, qrCodeUrl) => {
            if (err) throw err;
    
            // Add the QR Code to the PDF
            doc.addImage(qrCodeUrl, 'PNG', 10, 130, 50, 50); // Adjust size and position
    
            // Save the PDF with QR code and watermark embedded
            doc.save(`Booking_Seat_${seatNumber}.pdf`);
        });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedSeat,
                    eventType,
                    ...formData
                })
            });

            if (response.ok) {
                const updatedSeats = seats.map(seat =>
                    seat.id === selectedSeat
                        ? {
                            ...seat,
                            isBooked: true,
                            [eventType]: {
                                ...seat[eventType],
                                booked: true,
                                name: formData.name,
                                phone: formData.phone,
                                email: formData.email
                            }
                        }
                        : seat
                );

                setSeats(updatedSeats);
                alert(`Seat ${selectedSeat} booked successfully for ${ename}!`);
                downloadPDF(selectedSeat, formData.email);
            } else {
                alert('Failed to book the seat. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while booking the seat.');
        }

        setFormVisible(false);
        setFormData({ name: '', phone: '', email: '' });
    };

    const handleCancel = () => {
        setFormVisible(false);
        setFormData({ name: '', phone: '', email: '' });
    };

    let seatNumber = 1;

    return (
        <div className={styles.container}>
            <h1>Event Hall: {eventLocation}</h1>
            <h1 className={styles.eventName}>Select your seat</h1>

            <div className={styles.circularLayout}>
                {/* Render Doors */}
                <div className={`${styles.door} ${styles.top}`} />
                <div className={`${styles.door} ${styles.bottom}`} />
                <div className={`${styles.door} ${styles.left}`} />
                <div className={`${styles.door} ${styles.right}`} />

                {/* Render Seats */}
                {seatLayers.map((layer) => (
                    Array.from({ length: layer.seats }).map((_, seatIndex) => {
                        const seatId = seatNumber++;
                        const seat = seats.find(seat => seat.id === seatId);
                        const isBooked = seat?.isBooked || false;
                        const angle = (360 / layer.seats) * seatIndex;
                        const x = Math.cos((angle * Math.PI) / 180) * layer.radius;
                        const y = Math.sin((angle * Math.PI) / 180) * layer.radius;

                        return (
                            <div
                                key={seatId}
                                className={`${styles.seat} ${isBooked ? styles.booked : styles.available}`}
                                title={isBooked ? "Booked" : "Available"}
                                onClick={() => handleSeatClick(seatId)}
                                style={{ transform: `translate(${x}px, ${y}px)` }}
                            >
                                {seatId}
                            </div>
                        );
                    })
                ))}
            </div>

            {formVisible && (
                <div className={styles.overlay}>
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h2>Book Seat {selectedSeat}</h2>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>

                            <div className={styles.buttonContainer}>
                                <button type="submit" className={styles.submitButton}>Book</button>
                                <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

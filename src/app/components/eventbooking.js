'use client';

import { useState, useEffect } from "react";
import styles from '../booking/styles/style.module.css';
import seatData from "../data/booking.json"; // Importing the JSON data
import { jsPDF } from "jspdf"; // Import jsPDF
import QRCode from 'qrcode'; // Import the QR code library

export default function SeatMap({ eventType, eventLocation, ename,eTime }) {
    const seatRows = [
        { id: 1, seats: 5 },
        { id: 2, seats: 7 },
        { id: 3, seats: 9 },
        { id: 4, seats: 11 }
    ];

    const [seats, setSeats] = useState([]); // Holds the current seat data
    const [formVisible, setFormVisible] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [eventName, setEventName] = useState(""); // Holds the event name

    // Load seat data based on event type ("event1" or "event2")
    useEffect(() => {
        const processedSeats = seatData.map(seat => {
            const eventData = seat[eventType]; // Dynamically select the event data based on eventType
            return {
                ...seat,
                isBooked: eventData.booked, // Check booking status
                eventName: eventData.name   // Use event name
            };
        });
        setSeats(processedSeats);

        // Set event name from the selected event data
        if (seatData.length > 0) {
            const firstEvent = seatData[0][eventType]; // Select event data based on prop
            setEventName(firstEvent.name);
        }
    }, [eventType]);

    // Handle seat click to open the booking form (if seat is available)
    const handleSeatClick = (id) => {
        const seat = seats.find(seat => seat.id === id);
        if (!seat.isBooked) {
            setSelectedSeat(id);
            setFormVisible(true);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to trigger PDF download with name, seat number, event name, email, and date
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
        doc.text(`Event Name: ${ename} time  ${eTime}`, 30, 90); // Shifted inside
        doc.text(`Email: ${email}`, 30, 100); // Shifted inside
        doc.text(`Date: ${currentDate}`, 30, 110); // Shifted inside
        
    
        // Create a double rectangular border (orange outer, yellow inner) with left side pushed inside
        // Outer border (orange) with left side pushed inside
        doc.setDrawColor(255, 165, 0); // Orange color
        doc.setLineWidth(5); // Line width for outer border
        doc.rect(5, -5, 200, 300); // Outer rectangle, shifted left side by 5 (right, top, bottom stay the same)
    
        // Inner border (yellow) with adjusted left side
        doc.setDrawColor(255, 255, 0); // Yellow color
        doc.setLineWidth(3); // Line width for inner border
        doc.rect(10, 0, 190, 290); // Inner rectangle, shifted left side by 10 (right, top, bottom stay the same)
    
        // Add design elements (optional)
        doc.setDrawColor(0); // Black color for the rectangle
        doc.setLineWidth(1);
        doc.rect(10, 110, 190, 20); // Add a box around the QR code section
        doc.text("QR Code for Event", 75, 120); // Label for the QR code
    
        // Generate QR Code data URL (encode seat number and email)
        const qrData = `Seat: ${seatNumber}, Email: ${email}`;
    
        QRCode.toDataURL(qrData, (err, qrCodeUrl) => {
            if (err) throw err;
    
            // Add the QR Code to the PDF
            doc.addImage(qrCodeUrl, 'PNG', 10, 130, 50, 50); // Adjust size and position
    
            // Save the PDF with QR code and watermark embedded
            doc.save(`Booking_Seat_${seatNumber}.pdf`);
        });
    };
    
    

    // Handle form submission to update booking data for the selected event only
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedSeat,
                    eventType, // Send eventType as part of the request
                    ...formData
                })
            });

            if (response.ok) {
                const updatedSeats = seats.map(seat =>
                    seat.id === selectedSeat
                        ? {
                            ...seat,
                            isBooked: true,
                            [eventType]: { // Update only the selected event's data
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

                // Trigger PDF download with all booking details
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

    // Handle form cancellation
    const handleCancel = () => {
        setFormVisible(false);
        setFormData({ name: '', phone: '', email: '' });
    };

    let seatNumber = 1; // Global seat number tracker

    return (
        <div className={styles.container}>
            <h1>Event Hall: {eventLocation}</h1>
            <h1 className={styles.eventName}>Select your seat</h1>
            
            <div className={styles.trapezium}>
                {seatRows.map((row) => (
                    <div key={row.id} className={styles.row}>
                        {Array.from({ length: row.seats }).map((_, seatIndex) => {
                            const seatId = seatNumber++; // Increment seat number
                            const seat = seats.find(seat => seat.id === seatId);
                            const isBooked = seat?.isBooked || false;

                            return (
                                <div
                                    key={seatIndex}
                                    className={`${styles.seat} ${isBooked ? styles.booked : styles.available}`}
                                    title={isBooked ? "Booked" : "Available"} // Tooltip on hover
                                    onClick={() => handleSeatClick(seatId)} // Handle click event
                                >
                                    {seatId}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {formVisible && (
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

                        {/* Hidden field for event type */}
                        <input type="hidden" name="eventType" value={eventType} />

                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.submitButton}>Book</button>
                            <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

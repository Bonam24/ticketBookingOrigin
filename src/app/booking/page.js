"use client";
import EventBooking from '../components/eventbooking';
import EventBooking2 from '../components/eventbooking2';
import { useRouter } from 'next/navigation';
//const router = useRouter();
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/navbar';
import Sfooter from '../components/sfooter';
import { Typography } from '@mui/material';




export default function BookingPage() {
    const usesearchParams = useSearchParams();
    const eloc= usesearchParams.get('eLocation');
    const eTime = usesearchParams.get('eTime')

        if(eloc=="theatre1"){
            return (
                <div style={{ backgroundColor: "black",  minHeight: "100vh", paddingBottom: 50,}}>
                    <Navbar />
                    <Typography 
                    variant="h4" // Choose a suitable variant like h4 or h5 based on your design
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        textAlign: 'center', // Center the heading
                        color: '#ffa500', // A blue color (Material UI primary color)
                        marginTop: 3, // Spacing at the top
                        marginBottom: 2, // Spacing at the bottom
                        textTransform: 'capitalize', // Capitalizes the event name if needed
                    }}
                >
                    The event name: {usesearchParams.get('name')}
                </Typography>
                    <EventBooking  eventType={usesearchParams.get('enum')} eTime={eTime}
                     eventLocation={usesearchParams.get('eLocation') } ename={usesearchParams.get('name')}/>
                    
                </div>
            );
        }
        else{
            return (
                <div style={{ backgroundColor: "black",  minHeight: "100vh",paddingBottom: 50,}}>
                    <Navbar />
                    <Typography 
                    variant="h4" // Choose a suitable variant like h4 or h5 based on your design
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        textAlign: 'center', // Center the heading
                        color: '#ffa500', 
                        marginTop: 3, // Spacing at the top
                        marginBottom: 2, // Spacing at the bottom
                        textTransform: 'capitalize',
                    }}
                >
                    The event name: {usesearchParams.get('name')}
                </Typography>
                    <EventBooking2  eventType={usesearchParams.get('enum')} eTime={eTime}
                    eventLocation={usesearchParams.get('eLocation') } ename={usesearchParams.get('name')}/>
                    
                </div>
            );
        }
    
   
}
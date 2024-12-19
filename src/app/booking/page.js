"use client";

import EventBooking from '../components/eventbooking';
import EventBooking2 from '../components/eventbooking2';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/navbar';
import Sfooter from '../components/sfooter';
import { Typography } from '@mui/material';
import React, { Suspense } from 'react';

function BookingContent() {
  // Use a different name for the variable to avoid naming conflict
  const searchParams = useSearchParams();
  const eloc = searchParams.get('eLocation');
  const eTime = searchParams.get('eTime');

  if (eloc === "theatre1") {
    return (
      <div style={{ backgroundColor: "black", minHeight: "100vh", paddingBottom: 50 }}>
        <Navbar />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: '2rem',
            textAlign: 'center',
            color: '#ffa500',
            marginTop: 3,
            marginBottom: 2,
            textTransform: 'capitalize',
          }}
        >
          The event name: {searchParams.get('name')}
        </Typography>
        <EventBooking
          eventType={searchParams.get('enum')}
          eTime={eTime}
          eventLocation={searchParams.get('eLocation')}
          ename={searchParams.get('name')}
        />
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "black", minHeight: "100vh", paddingBottom: 50 }}>
        <Navbar />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: '2rem',
            textAlign: 'center',
            color: '#ffa500',
            marginTop: 3,
            marginBottom: 2,
            textTransform: 'capitalize',
          }}
        >
          The event name: {searchParams.get('name')}
        </Typography>
        <EventBooking2
          eventType={searchParams.get('enum')}
          eTime={eTime}
          eventLocation={searchParams.get('eLocation')}
          ename={searchParams.get('name')}
        />
      </div>
    );
  }
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}

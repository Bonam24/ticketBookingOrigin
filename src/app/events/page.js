"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Box, Button } from "@mui/material";
import Navbar from "../components/navbar";
import SearchEvent from "../components/searchFunction";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Navigation, Pagination } from "swiper/modules"; 
import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/eventsData.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching event data:", error));
  }, []);

  return (
    <div style={{ backgroundColor: "black",  minHeight: "100vh",}}>
      <Navbar />
      <Box>
        <SearchEvent />
      </Box>

      <Container sx={{ py: 3, mt: -5 }}>
        <Typography variant="h4" align="center" sx={{
    background: "linear-gradient(to right, orange, white)", // Gradient background
    WebkitBackgroundClip: "text", // Clip the background to the text
    WebkitTextFillColor: "transparent", // Make the text fill color transparent
  }} gutterBottom>
          Featured Events
        </Typography>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]} // Use Navigation and Pagination modules correctly
          spaceBetween={20} // Space between slides
          slidesPerView={1} // Number of slides visible at once
          loop={true} // Infinite loop
          pagination={{ clickable: true }} // Enable pagination (dots)
          navigation // Enable left-right arrows for navigation
          breakpoints={{
            600: {
              slidesPerView: 2, // Show 2 slides for medium screens
            },
            900: {
              slidesPerView: 3, // Show 3 slides for larger screens
            },
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.3s",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: 250,
                  }}
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s",
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date of event : {event.eventDate} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time of event :  {event.eventTime}
                  </Typography>
                  
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF6F00",
                      "&:hover": { backgroundColor: "#FF8F00" },
                    }}
                  >
                    <Link
                      href={{
                        pathname: "/booking",
                        query: { name: event.title, enum: event.eventnumber, eLocation:event.eventLocation, eTime:event.eventTime }, 
                      }}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Book Seat
                    </Link>
                  </Button>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <Box
        sx={{
          backgroundColor: "#FF6F00",
          color: "white",
          py: 5,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Don’t Miss Out on These Events!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Stay updated with the best upcoming events near you. Reserve your
          tickets now!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#FF8F00",
            "&:hover": { backgroundColor: "#FF6F00" },
          }}
        >
          Get Your Tickets
        </Button>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: "#333",
          color: "white",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}

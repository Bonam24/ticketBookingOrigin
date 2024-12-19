"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function EventsSection() {
  const [events, setEvents] = useState([]);

  // Fetch event data from eventsData.json
  useEffect(() => {
    fetch("/eventsData.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching event data:", error));
  }, []);

  return (
    <Container sx={{ py: 2 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          py: 3,
          background: "linear-gradient(to right, #FF6F00, #FFFFFF)", // Gradient from orange to white
          WebkitBackgroundClip: "text",
          color: "transparent", // Makes text color transparent to show gradient
        }}
      >
        Upcoming Events
      </Typography>

      <Grid container spacing={3}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxShadow: 2,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {/* Cropped Image */}
              <CardMedia
                component="img"
                sx={{
                  height: 200, // Shortened visible height
                  objectFit: "cover", // Crops the image
                }}
                image={event.imageUrl}
                alt={event.title}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2, // Reduced padding inside the card
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ mb: 1 }}
                >
                  {event.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5, flexGrow: 1 }}
                >
                  {event.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Location: {event.eventLocation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

"use client";
import { Box, Container, Typography, Button } from "@mui/material";
import {useRouter} from "next/navigation";
import { use } from "react";

export default function HeroSection() {
  const router = useRouter();
  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(to right, ${theme.palette.warning.dark}, ${theme.palette.warning.light})`,
        py: { xs: 8, md: 12 },
        textAlign: "center",
        color: "white",
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Discover Amazing Events Near You
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Book tickets for concerts, plays, theaters, and much more.
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "white",
            color: (theme) => theme.palette.warning.dark,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.warning.light,
            },
            px: 5,
            py: 1.5,
          }}
          onClick={() => {router.push('/events')}}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}

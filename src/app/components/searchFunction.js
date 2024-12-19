import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

const SearchEvent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const handleSearchClick = () => {
    console.log("Searching for:", searchQuery); 
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "3rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "2rem",
          background: "linear-gradient(45deg, #FF6F00, #fff)", // Gradient from orange to black
          WebkitBackgroundClip: "text", // Clip the gradient to the text
          color: "transparent", // Makes the gradient visible
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", 
        }}
      >
        Search for an event
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "nowrap",
          width: "100%",
        }}
      >
        <TextField
          label="Search Events"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            flex: "1",
            maxWidth: "70%", // Search field takes up most of the width
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#FF6F00", // Orange border
              },
              "&:hover fieldset": {
                borderColor: "#FF8F00", // Brighter orange on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FF6F00", // Orange border when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "#FFF", // White text color when typing
            },
            "& .MuiInputLabel-root": {
              color: "#888", // Gray label color
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF6F00",
            color: "#FFF",
            fontWeight: "bold",
            padding: "0.8rem 2rem",
            "&:hover": {
              backgroundColor: "#FF8F00",
            },
          }}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Box>
    </Container>
  );
};

export default SearchEvent;

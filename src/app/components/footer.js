import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#d05e00', // Dirty black color
        color: 'white',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1: About */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Eventify
            </Typography>
            <Typography variant="body2">
              Discover and book tickets for events, plays, and theaters near you. Your one-stop platform for entertainment.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/events" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Events
              </Link>
              <Link href="/events" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Plays
              </Link>
              <Link href="/events" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
                Theaters
              </Link>
            </Box>
          </Grid>

          {/* Column 3: Follow Us */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#E65100' } }} // Muted orange hover effect
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#E65100' } }} // Muted orange hover effect
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#E65100' } }} // Muted orange hover effect
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://youtube.com"
                target="_blank"
                sx={{ color: 'white', '&:hover': { color: '#E65100' } }} // Muted orange hover effect
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

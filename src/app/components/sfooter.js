import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', 
            }}
        >
            {/* Main content here */}
            <Box sx={{ flex: 1 }}>
                
            </Box>

            {/* Footer */}
            <Box sx={{
                backgroundColor: '#333',
                color: 'white',
                padding: '20px 0',
                textAlign: 'center',
                position: 'relative',
            }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Typography variant="body2">
                            &copy; 2024 Eventify
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2">
                            <Link href="/privacy-policy" color="inherit">Privacy Policy</Link> | 
                            <Link href="/terms-of-service" color="inherit"> Terms of Service</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

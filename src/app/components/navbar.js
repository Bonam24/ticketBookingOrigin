"use client";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" color="primary" sx={{ backgroundColor: '#FF6F00' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Eventify
        </Typography>

        {/* Menu Icon Button for Mobile View */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', sm: 'none' } }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Navbar Buttons for Large Screens */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Button color="inherit" onClick={() => router.push('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push('/events')}>
            Events
          </Button>
        </Box>
      </Toolbar>

      {/* Drawer Menu for Mobile View */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {/* Each ListItem is explicitly configured */}
          <ListItem
            button={true} 
            onClick={() => {
              toggleDrawer(false);
              router.push('/');
            }}
          >
            <ListItemText primary="HOME" />
          </ListItem>
          <ListItem
            button={true} 
            onClick={() => {
              toggleDrawer(false);
              router.push('/events');
            }}
          >
            <ListItemText primary="EVENTS" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}

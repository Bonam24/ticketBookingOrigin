import { Box } from '@mui/material';
import HeroSection from './components/heroSection';
import EventsSection from './components/eventSection';
import Footer from './components/footer';
import Navbar from './components/navbar';


export default function Home() {
  return (
    <Box style={{ backgroundColor: "black",  minHeight: "100vh",}}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Events Section */}
      <EventsSection />

      {/* Footer */}
      <Footer />
    </Box>
  );
}

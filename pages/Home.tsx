import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import Experience from '../components/Experience';

const Home: React.FC = () => {
  // Ensure we start at top if navigating back (unless hash handled by Navbar)
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div id="about">
        <Hero />
      </div>
      <TechStack />
      <Experience />
    </>
  );
};

export default Home;
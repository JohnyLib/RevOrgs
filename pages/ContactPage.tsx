import React, { useEffect } from 'react';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center pt-20 bg-black">
      <Contact />
    </div>
  );
};

export default ContactPage;
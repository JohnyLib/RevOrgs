import React, { useEffect } from 'react';
import Portfolio from '../components/Portfolio';

const PortfolioPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;
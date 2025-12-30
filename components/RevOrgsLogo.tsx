import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

const RevOrgsLogo: React.FC<LogoProps> = ({ className = "w-10 h-10", animate = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-brand-bronze"
      >
        {/* Abstract geometric shape mimicking the provided image: squares ascending */}
        <rect 
          x="10" 
          y="60" 
          width="20" 
          height="20" 
          stroke="currentColor" 
          strokeWidth="6"
          className={animate ? "animate-pulse" : ""}
        />
        <rect 
          x="30" 
          y="40" 
          width="20" 
          height="20" 
          fill="currentColor"
        />
        <path 
          d="M50 40 V20 H80 V50 H60" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-bold text-2xl tracking-tight text-white hidden md:block">RevOrgs</span>
    </div>
  );
};

export default RevOrgsLogo;
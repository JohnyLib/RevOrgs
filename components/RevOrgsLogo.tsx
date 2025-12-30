import React from 'react';

interface LogoProps {
  className?: string;
  animate?: boolean;
  showText?: boolean;
}

const RevOrgsLogo: React.FC<LogoProps> = ({ 
  className = "w-10 h-10", 
  animate = false,
  showText = true 
}) => {
  // Check if custom logo image exists, otherwise use default SVG
  // To use your custom logo:
  // 1. Add logo.png (or logo.svg) to /public folder
  // 2. Set hasCustomLogo to true
  const hasCustomLogo = false; // Change to true after adding your logo to /public folder
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {hasCustomLogo ? (
        <img 
          src="/logo.png" 
          alt="RevOrgs Logo" 
          className="h-full w-auto object-contain"
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-brand-bronze"
        >
          {/* Abstract geometric shape */}
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
      )}
      {showText && (
        <span className="font-bold text-2xl tracking-tight text-white hidden md:block">
          RevOrgs
        </span>
      )}
    </div>
  );
};

export default RevOrgsLogo;
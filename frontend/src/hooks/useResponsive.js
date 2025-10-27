'use client';

import { useState, useEffect } from 'react';

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      // Set device type
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    isMobile,
    isTablet,
    isDesktop,
    windowSize,
    isSmallMobile: windowSize.width < 480,
    isLargeMobile: windowSize.width >= 480 && windowSize.width < 768,
    isSmallTablet: windowSize.width >= 768 && windowSize.width < 900,
    isLargeTablet: windowSize.width >= 900 && windowSize.width < 1024,
    isSmallDesktop: windowSize.width >= 1024 && windowSize.width < 1200,
    isLargeDesktop: windowSize.width >= 1200,
  };
}
import React from 'react';
import { ReactNode } from 'react';

interface BenchLayoutProps {
  children: ReactNode;
}

const BenchLayout: React.FC<BenchLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  );
};

export default BenchLayout;
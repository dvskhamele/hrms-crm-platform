'use client';

import React from 'react';

interface BenefitItem {
  text: string;
  icon?: React.ReactNode;
}

interface BenefitsSectionProps {
  benefits?: BenefitItem[];
  title?: string;
  description?: string;
  columns?: '1' | '2' | '3' | '4';
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  benefits = [
    { text: "Reduce operational costs by up to 30%" },
    { text: "Improve candidate satisfaction scores" },
    { text: "Streamline staff workflows" },
    { text: "Real-time visibility into HR operations" },
    { text: "Data-driven decision making" },
    { text: "Mobile-responsive interface for on-the-go access" }
  ],
  title = "Key Benefits",
  description = "Transform your HR operations with measurable improvements",
  columns = '3'
}) => {
  const getGridClasses = () => {
    switch (columns) {
      case '1':
        return 'grid-cols-1';
      case '2':
        return 'grid-cols-1 md:grid-cols-2';
      case '3':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case '4':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">{description}</p>
      </div>
      
      {/* Benefits Grid */}
      <div className={`grid gap-8 ${getGridClasses()}`}>
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="flex items-start p-4 rounded-xl hover:bg-slate-50 transition-all duration-300 group"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                {benefit.icon || <CheckIcon />}
              </div>
            </div>
            <p className="ml-3 text-lg text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
              {benefit.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
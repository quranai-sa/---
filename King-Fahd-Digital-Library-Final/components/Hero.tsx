import React from 'react';
import { SearchBar } from './SearchBar';

interface HeroProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

/**
 * Hero section component with search functionality
 * Main landing area for the digital library
 */
export const Hero: React.FC<HeroProps> = ({ 
  searchTerm, 
  onSearchChange, 
}) => {
  return (
    <div className="bg-gradient-to-br from-brand-green-dark to-brand-green-light text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/images/quran-complex-logo.png" 
            alt="شعار مجمع الملك فهد لطباعة المصحف الشريف"
            className="h-24 w-auto object-contain mb-6"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            مجمع الملك فهد لطباعة المصحف الشريف
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">
            المكتبة الرقمية
          </h2>
        </div>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          منصة رقمية للوصول إلى إصدارات المجمع الرقمية
        </p>
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            value={searchTerm} 
            onChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  );
};
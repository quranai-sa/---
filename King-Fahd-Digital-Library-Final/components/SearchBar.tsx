import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative">
       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-4">
        <svg className="h-6 w-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="ابحث عن مصحف, ترجمة, تفسير, تطبيق..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 pl-12 pr-12 text-lg bg-white/10 border-2 border-transparent rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold focus:bg-white/20 transition-all duration-300 rtl:pl-4 rtl:pr-12"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-white transition-colors rtl:left-0 rtl:right-auto rtl:pl-4 rtl:pr-0"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

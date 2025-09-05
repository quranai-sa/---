import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-4 sm:py-6">
      <div className="flex justify-center">
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-3" aria-label="Tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`whitespace-nowrap py-2 px-5 rounded-full font-semibold text-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light
                ${
                  selectedCategory === category.id
                    ? 'bg-brand-green-dark text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

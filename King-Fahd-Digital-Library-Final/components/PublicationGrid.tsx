import React from 'react';
import { Publication } from '../types';
import { PublicationCard } from './PublicationCard';

interface PublicationGridProps {
  publications: Publication[];
  onSelectPublication: (publication: Publication) => void;
  isAdminMode: boolean;
  onEditPublication: (publication: Publication) => void;
  onDeletePublication: (publicationId: number) => void;
  onAddNewPublication: () => void;
  onOpenStats: (publication: Publication) => void;
}

export const PublicationGrid: React.FC<PublicationGridProps> = ({ 
  publications, 
  onSelectPublication,
  isAdminMode,
  onEditPublication,
  onDeletePublication,
  onAddNewPublication,
  onOpenStats
}) => {
  if (publications.length === 0 && !isAdminMode) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-700">لا توجد نتائج</h2>
        <p className="text-gray-500 mt-2">حاول تعديل معايير البحث أو الفلترة.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
      {isAdminMode && (
         <div className="col-span-full">
            <button 
              onClick={onAddNewPublication}
              className="w-full px-5 py-3 border border-dashed border-gray-400 text-base font-medium rounded-lg text-gray-600 bg-gray-50 hover:bg-gray-100 hover:border-brand-green-light hover:text-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light transition-colors"
            >
              + إضافة إصدار جديد
            </button>
         </div>
      )}
      
      {publications.map((pub) => (
        <PublicationCard 
          key={pub.id} 
          publication={pub} 
          onSelect={onSelectPublication} 
          isAdminMode={isAdminMode}
          onEdit={onEditPublication}
          onDelete={onDeletePublication}
          onOpenStats={onOpenStats}
        />
      ))}

      {publications.length === 0 && isAdminMode && (
          <div className="col-span-full text-center py-16 bg-gray-50/80 rounded-lg border border-dashed">
              <h2 className="text-xl font-bold text-gray-600">المكتبة فارغة حالياً</h2>
              <p className="text-gray-500 mt-2">انقر على الزر أعلاه لبدء إضافة المحتوى.</p>
          </div>
      )}
    </div>
  );
};

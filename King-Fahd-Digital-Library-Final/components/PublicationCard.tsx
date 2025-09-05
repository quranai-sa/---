import React from 'react';
import { Publication, PublicationType } from '../types';
import { useAudio } from './AudioManager';

interface PublicationCardProps {
  publication: Publication;
  onSelect: (publication: Publication) => void;
  isAdminMode: boolean;
  onEdit: (publication: Publication) => void;
  onDelete: (publicationId: number) => void;
  onOpenStats: (publication: Publication) => void;
}

const translatePublicationType = (type: PublicationType) => {
    const map: Record<PublicationType, string> = {
      [PublicationType.Printed]: "مطبوع",
      [PublicationType.Digital]: "رقمي",
      [PublicationType.Audio]: "صوتي",
      [PublicationType.Braille]: "برايل",
      [PublicationType.App]: "تطبيق",
      [PublicationType.Research]: "بحث",
      [PublicationType.Riwaya]: "رواية",
    };
    return map[type] || type;
};

export const PublicationCard: React.FC<PublicationCardProps> = ({ publication, onSelect, isAdminMode, onEdit, onDelete, onOpenStats }) => {
  const { playTrack, currentTrack, isPlaying, showPlaylist } = useAudio();
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(publication);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(publication.id);
  };

  const handleStatsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenStats(publication);
  };


  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group border border-gray-200 hover:shadow-xl"
      onClick={() => onSelect(publication)}
    >
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" 
          src={publication.coverUrl} 
          alt={`غلاف ${publication.title}`} 
        />
        <div className="absolute top-0 right-0 bg-brand-green-light text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
          {translatePublicationType(publication.type)}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex-grow group-hover:text-brand-green-light">{publication.title}</h3>
        <div className="mt-4 flex justify-between items-center">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-brand-green-light bg-brand-green-light/20">
                {publication.language}
            </span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {publication.type === PublicationType.Audio && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playTrack(publication);
                  }}
                  className="text-brand-green hover:text-brand-green-dark transition-colors p-1 rounded-full hover:bg-brand-green/10 focus:outline-none focus:ring-2 focus:ring-brand-green"
                  aria-label="تشغيل المقطع الصوتي"
                  title="تشغيل المقطع الصوتي"
                >
                  {currentTrack?.id === publication.id && isPlaying ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )}
              <button
                onClick={handleStatsClick}
                className="text-gray-400 hover:text-brand-gold transition-colors p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="عرض الإحصائيات"
                title="عرض الإحصائيات"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </button>
            </div>
        </div>
        {isAdminMode && (
          <div className="border-t mt-4 pt-3 flex justify-end space-x-2 space-x-reverse">
            <button
              onClick={handleEdit}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              تعديل
            </button>
            <button
              onClick={handleDelete}
              className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors"
            >
              حذف
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

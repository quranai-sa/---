import React, { useState } from 'react';
import { Publication, PublicationType } from '../types';
// Removed InAppBrowserModal import as it was deleted
import { AudioPlayer } from './AudioPlayer';
import { incrementStat } from '../services/statsService';

const BrowseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

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

interface PublicationDetailModalProps {
    publication: Publication | null;
    onClose: () => void;
}

export const PublicationDetailModal: React.FC<PublicationDetailModalProps> = ({ publication, onClose }) => {
  const [shareFeedback, setShareFeedback] = useState('');
  const [isBrowsing, setIsBrowsing] = useState(false);

  if (!publication) return null;

  const handleShare = async () => {
    setShareFeedback('');
    const shareData = {
      title: `مجمع الملك فهد لطباعة المصحف الشريف: ${publication.title}`,
      text: publication.description,
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        incrementStat(publication.id, 'shares');
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        const shareableText = `اطلع على هذا الإصدار من مكتبة مجمع الملك فهد لطباعة المصحف الشريف:\n\n*${publication.title}*\n${publication.description}\n\nتصفح المكتبة: ${window.location.href}`;

        await navigator.clipboard.writeText(shareableText);
        incrementStat(publication.id, 'shares');
        setShareFeedback('تم نسخ معلومات المشاركة!');
        setTimeout(() => setShareFeedback(''), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
        setShareFeedback('فشل النسخ.');
        setTimeout(() => setShareFeedback(''), 2000);
      }
    }
  };

  const handleDownloadClick = () => {
    if (publication) {
      incrementStat(publication.id, 'downloads');
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full md:w-1/3">
            <img src={publication.coverUrl} alt={`Cover of ${publication.title}`} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-2/3 p-6 sm:p-8 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{publication.title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4 border-b pb-4">
              <span><strong>النوع:</strong> <span className="text-brand-green-light font-semibold">{translatePublicationType(publication.type)}</span></span>
              <span><strong>اللغة:</strong> {publication.language}</span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{publication.description}</p>
            
            {publication.type === PublicationType.Audio && publication.downloadUrl && (
              <AudioPlayer src={publication.downloadUrl} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
              {publication.browseUrl && (
                <button
                  onClick={() => setIsBrowsing(true)}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-green-light hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light transition-colors"
                >
                  <BrowseIcon />
                  تصفح الإصدار
                </button>
              )}
              {publication.downloadUrl && (
                <a
                  href={publication.downloadUrl}
                  onClick={handleDownloadClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light transition-colors ${
                    !publication.browseUrl && publication.type !== PublicationType.Audio
                      ? 'border border-transparent text-white bg-brand-green-light hover:bg-brand-green-dark'
                      : 'border-2 border-brand-green-light text-brand-green-light bg-transparent hover:bg-brand-green-light hover:text-white'
                  }`}
                >
                  <DownloadIcon />
                  تحميل الإصدار
                </a>
              )}
              <div className="relative w-full"> 
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center px-6 py-3 border-2 border-brand-gold text-base font-medium rounded-md text-brand-gold bg-transparent hover:bg-brand-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
                >
                  <ShareIcon />
                  مشاركة
                </button>
                {shareFeedback && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10 text-xs bg-gray-800 text-white px-2 py-1 rounded-md whitespace-nowrap">
                        {shareFeedback}
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isBrowsing && publication.browseUrl && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4"
          onClick={() => setIsBrowsing(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full h-full max-w-6xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex justify-between items-center p-4 border-b bg-gray-50 flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-800 truncate">{publication.title}</h2>
              <button 
                onClick={() => setIsBrowsing(false)}
                className="text-gray-500 hover:text-gray-800 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-light"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <main className="flex-grow bg-gray-200">
              <iframe
                src={publication.browseUrl}
                title={publication.title}
                className="w-full h-full border-0"
                allow="fullscreen"
              />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

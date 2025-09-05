import React from 'react';
import { useAudio } from './AudioManager';

interface HeaderProps {
  onContactClick?: () => void;
}

/**
 * Header component for the King Fahd Complex Digital Library
 * Displays the official logo and branding with contact link
 */
export const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  const { showPlaylist, playlist } = useAudio();
  
  return (
    <header className="bg-brand-green-dark/90 backdrop-blur-sm shadow-lg sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <img 
              src="/images/quran-complex-logo.png" 
              alt="شعار مجمع الملك فهد لطباعة المصحف الشريف"
              className="h-16 w-auto object-contain"
            />
            <div className="text-right">
              <h1 className="text-white text-xl font-bold leading-tight">
                مجمع الملك فهد لطباعة المصحف الشريف
              </h1>
              <p className="text-white/90 text-sm font-medium">
                المكتبة الرقمية
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Playlist Button */}
            {playlist.length > 0 && (
              <button
                onClick={showPlaylist}
                className="relative text-white/90 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                title="قائمة التشغيل"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {playlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {playlist.length}
                  </span>
                )}
              </button>
            )}
            
            {/* Contact Link */}
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10"
              >
                تواصل معنا
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
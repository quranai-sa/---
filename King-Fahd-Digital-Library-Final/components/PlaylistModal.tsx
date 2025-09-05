import React from 'react';
import { Publication } from '../types';

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Publication[];
  currentTrack: Publication | null;
  onSelectTrack: (track: Publication) => void;
  onRemoveTrack: (trackId: number) => void;
  onClearPlaylist: () => void;
}

export const PlaylistModal: React.FC<PlaylistModalProps> = ({
  isOpen,
  onClose,
  playlist,
  currentTrack,
  onSelectTrack,
  onRemoveTrack,
  onClearPlaylist
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-green to-brand-green-dark p-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">قائمة التشغيل</h2>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={onClearPlaylist}
                className="px-3 py-1 bg-white/20 rounded text-sm hover:bg-white/30 transition-colors"
              >
                مسح الكل
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Playlist Content */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {playlist.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <p className="text-lg font-medium">قائمة التشغيل فارغة</p>
              <p className="text-sm">اضغط على أي مقطع صوتي لإضافته إلى قائمة التشغيل</p>
            </div>
          ) : (
            <div className="space-y-2">
              {playlist.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg transition-colors cursor-pointer ${
                    currentTrack?.id === track.id
                      ? 'bg-brand-green/10 border border-brand-green/20'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onSelectTrack(track)}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{track.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{track.language}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {currentTrack?.id === track.id && (
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
                        <span className="text-xs text-brand-green font-medium">جاري التشغيل</span>
                      </div>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveTrack(track.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>إجمالي المقاطع: {playlist.length}</span>
            <span>المدة الإجمالية: {Math.floor(playlist.length * 3.5)} دقيقة</span>
          </div>
        </div>
      </div>
    </div>
  );
};

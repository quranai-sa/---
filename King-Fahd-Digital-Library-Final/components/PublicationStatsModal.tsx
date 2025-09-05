import React, { useState, useEffect } from 'react';
import { Publication } from '../types';
import { getStatsForPublication } from '../services/statsService';
import { PublicationStats } from '../types';

const ViewsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const DownloadsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const SharesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);


interface PublicationStatsModalProps {
    publication: Publication | null;
    onClose: () => void;
}

export const PublicationStatsModal: React.FC<PublicationStatsModalProps> = ({ publication, onClose }) => {
    const [stats, setStats] = useState<PublicationStats | null>(null);

    useEffect(() => {
        if (publication) {
            getStatsForPublication(publication.id).then(setStats);
        } else {
            setStats(null);
        }
    }, [publication]);

    if (!publication) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="stats-modal-title"
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                           <h2 id="stats-modal-title" className="text-xl sm:text-2xl font-bold text-gray-800">إحصائيات الإصدار</h2>
                           <p className="text-md text-gray-600">{publication.title}</p>
                        </div>
                        <button onClick={onClose} aria-label="إغلاق" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center">
                            <ViewsIcon />
                            <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.views ?? '...'}</p>
                            <p className="text-sm font-semibold text-blue-700">المشاهدات</p>
                        </div>
                         <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center">
                            <DownloadsIcon />
                            <p className="text-3xl font-bold text-green-600 mt-2">{stats?.downloads ?? '...'}</p>
                            <p className="text-sm font-semibold text-green-700">التنزيلات</p>
                        </div>
                         <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center justify-center">
                            <SharesIcon />
                            <p className="text-3xl font-bold text-purple-600 mt-2">{stats?.shares ?? '...'}</p>
                            <p className="text-sm font-semibold text-purple-700">المشاركات</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

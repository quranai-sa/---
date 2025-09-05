import { PublicationStats, StatType } from '../types';

const STATS_STORAGE_KEY = 'kfcl_stats_v1';

const getAllStats = (): Record<number, PublicationStats> => {
    try {
        const statsJson = localStorage.getItem(STATS_STORAGE_KEY);
        if (statsJson) {
            return JSON.parse(statsJson);
        }
    } catch (error) {
        console.error("Failed to parse stats from localStorage:", error);
    }
    return {};
};

const saveAllStats = (stats: Record<number, PublicationStats>): void => {
    try {
        localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
        console.error("Failed to save stats to localStorage:", error);
    }
};

export const getStatsForPublication = async (publicationId: number): Promise<PublicationStats> => {
    return new Promise((resolve) => {
        const allStats = getAllStats();
        const defaultStats = { views: 0, downloads: 0, shares: 0 };
        resolve(allStats[publicationId] || defaultStats);
    });
};

export const incrementStat = async (publicationId: number, statType: StatType): Promise<void> => {
     return new Promise((resolve) => {
        const allStats = getAllStats();
        const currentStats = allStats[publicationId] || { views: 0, downloads: 0, shares: 0 };
        
        (currentStats as any)[statType] += 1;
        allStats[publicationId] = currentStats;

        saveAllStats(allStats);
        resolve();
    });
};

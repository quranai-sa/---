/**
 * Core types for the King Fahd Complex Digital Library
 */

export enum PublicationType {
  Printed = 'PRINTED',
  Digital = 'DIGITAL',
  Audio = 'AUDIO',
  Braille = 'BRAILLE',
  App = 'APP',
  Research = 'RESEARCH',
  Booklet = 'BOOKLET',
  Recitation = 'RECITATION',
  Riwaya = 'RIWAYA',
}

export interface Publication {
  readonly id: number;
  readonly title: string;
  readonly coverUrl: string;
  readonly categoryId: string;
  readonly language: string;
  readonly type: PublicationType;
  readonly description: string;
  readonly browseUrl?: string;
  readonly downloadUrl?: string;
}

export interface Category {
  readonly id: string;
  readonly name: string;
}

export interface PublicationStats {
  readonly views: number;
  readonly downloads: number;
  readonly shares: number;
}

export type StatType = keyof PublicationStats;

export interface AdminFormData {
  title: string;
  description: string;
  categoryId: string;
  language: string;
  type: PublicationType;
  coverUrl?: string;
  browseUrl?: string;
  downloadUrl?: string;
}

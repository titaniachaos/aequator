export type Language = 'en' | 'de' | 'bg';

/** Partial by design: only verified translations are filled in. */
export type LocalizedText = Partial<Record<Language, string>>;

export type Status = 'published' | 'draft' | 'rights-pending' | 'planned' | 'TBD';

export interface Person {
  id: string;
  publicName: string;
  role: LocalizedText;
  bio?: LocalizedText;
  approvedQuote?: LocalizedText;
  links?: string[];
  image?: string;
}

export interface MediaItem {
  stableId: string;
  type: 'image' | 'youtube' | 'video_file' | 'audio';
  sourceUrl?: string;
  originalFile?: string;
  title: LocalizedText;
  date?: string;
  place?: LocalizedText;
  eventId?: string;
  description?: LocalizedText;
  creator?: string;
  copyrightHolder?: string;
  consentStatus: 'approved' | 'pending' | 'internal-only';
  caption?: LocalizedText;
  altText?: LocalizedText;
  aspectRatio?: string;
  posterUrl?: string;
}

export interface Action {
  stableId: string;
  title: LocalizedText;
  date: string;
  place: LocalizedText;
  venueOrContext?: LocalizedText;
  status: Status;
  summary: LocalizedText;
  whatHappened?: LocalizedText;
  artisticRelevance?: LocalizedText;
  biancaRole?: LocalizedText;
  titaniaRole?: LocalizedText;
  participants?: string[];
  mediaIds?: string[];
  /** Public verified URLs only. */
  sourceLinks?: string[];
  credits?: LocalizedText;
  publicationStatus: Status;
}

export interface ProjectMetadata {
  title: LocalizedText;
  shortTitle: string;
  oneSentence: LocalizedText;
  creator: string;
  collaborator?: string;
  startYear?: number;
  collaborationStartYear?: number;
  targetMeasureKm?: number;
  currentMeasureMeters?: number;
  officialLinks?: { label: LocalizedText; url: string }[];
}

/** Public, verified source links only. Never an internal registry. */
export interface SourceLink {
  id: string;
  label: LocalizedText;
  url: string;
  verified: true;
}

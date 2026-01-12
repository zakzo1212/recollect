export interface Idea {
  id: string;
  text: string;
  tags: string[];
  createdAt: string;
  done: boolean;
  doneAt?: string;
}

export const DEFAULT_TAGS = [
  'outdoors',
  'solo',
  'friends',
  'low-energy',
  'foodie',
  'creative',
  'active',
  'relaxing',
  'social',
  'indoor',
] as const;

export type Tag = typeof DEFAULT_TAGS[number];

import { Idea } from '@/types/idea';

const STORAGE_KEY = 'recollect-ideas';

export function saveIdea(idea: Idea): void {
  const ideas = getIdeas();
  ideas.push(idea);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

export function getIdeas(): Idea[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  
  try {
    return JSON.parse(stored) as Idea[];
  } catch {
    return [];
  }
}

export function updateIdea(id: string, updates: Partial<Idea>): void {
  const ideas = getIdeas();
  const index = ideas.findIndex(idea => idea.id === id);
  
  if (index !== -1) {
    ideas[index] = { ...ideas[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }
}

export function deleteIdea(id: string): void {
  const ideas = getIdeas();
  const filtered = ideas.filter(idea => idea.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

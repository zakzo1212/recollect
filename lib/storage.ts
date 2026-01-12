import { Idea } from '@/types/idea';

const API_BASE = '/api/ideas';

// Save a new idea to the database
export async function saveIdea(idea: Idea): Promise<Idea> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: idea.text,
      tags: idea.tags,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to save idea' }));
    throw new Error(error.error || 'Failed to save idea');
  }

  return response.json();
}

// Get all ideas from the database
export async function getIdeas(): Promise<Idea[]> {
  const response = await fetch(API_BASE, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch ideas' }));
    throw new Error(error.error || 'Failed to fetch ideas');
  }

  return response.json();
}

// Update an existing idea
export async function updateIdea(id: string, updates: Partial<Idea>): Promise<Idea> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to update idea' }));
    throw new Error(error.error || 'Failed to update idea');
  }

  return response.json();
}

// Delete an idea
export async function deleteIdea(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to delete idea' }));
    throw new Error(error.error || 'Failed to delete idea');
  }
}

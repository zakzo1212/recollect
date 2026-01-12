'use client';

import { useState } from 'react';
import { Idea } from '@/types/idea';
import { updateIdea, deleteIdea } from '@/lib/storage';

interface IdeaCardProps {
  idea: Idea;
  onUpdate: () => void;
}

export default function IdeaCard({ idea, onUpdate }: IdeaCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleMarkDone = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await updateIdea(idea.id, {
        done: !idea.done,
        doneAt: !idea.done ? new Date().toISOString() : undefined,
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating idea:', error);
      alert('Failed to update idea. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    if (confirm('Are you sure you want to delete this idea?')) {
      setIsDeleting(true);
      try {
        await deleteIdea(idea.id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting idea:', error);
        alert('Failed to delete idea. Please try again.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`idea-card ${idea.done ? 'done' : ''}`}>
      <div className="idea-content">
        <p className="idea-text">{idea.text}</p>
        {idea.tags.length > 0 && (
          <div className="idea-tags">
            {idea.tags.map(tag => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="idea-meta">
          <span className="idea-date">
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="idea-actions">
        <button
          onClick={handleMarkDone}
          className={`action-button ${idea.done ? 'done-button' : 'mark-done-button'}`}
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? '...' : idea.done ? '✓ Done' : 'Mark Done'}
        </button>
        <button
          onClick={handleDelete}
          className="action-button delete-button"
          disabled={isUpdating || isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

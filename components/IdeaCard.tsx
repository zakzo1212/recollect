'use client';

import { Idea } from '@/types/idea';
import { updateIdea, deleteIdea } from '@/lib/storage';

interface IdeaCardProps {
  idea: Idea;
  onUpdate: () => void;
}

export default function IdeaCard({ idea, onUpdate }: IdeaCardProps) {
  const handleMarkDone = () => {
    updateIdea(idea.id, {
      done: !idea.done,
      doneAt: !idea.done ? new Date().toISOString() : undefined,
    });
    onUpdate();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this idea?')) {
      deleteIdea(idea.id);
      onUpdate();
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
        >
          {idea.done ? '✓ Done' : 'Mark Done'}
        </button>
        <button
          onClick={handleDelete}
          className="action-button delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

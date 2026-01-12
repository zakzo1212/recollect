'use client';

import { useState, useRef, useEffect } from 'react';
import { Idea, DEFAULT_TAGS } from '@/types/idea';
import { saveIdea } from '@/lib/storage';

interface IdeaFormProps {
  onIdeaAdded: () => void;
}

export default function IdeaForm({ onIdeaAdded }: IdeaFormProps) {
  const [text, setText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newIdea: Idea = {
        id: crypto.randomUUID(),
        text: text.trim(),
        tags: selectedTags,
        createdAt: new Date().toISOString(),
        done: false,
      };

      await saveIdea(newIdea);
      setText('');
      setSelectedTags([]);
      setShowTags(false);
      onIdeaAdded();
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error saving idea:', error);
      alert('Failed to save idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <div className="form-group">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What would you like to do?"
          className="idea-input"
          onFocus={() => setShowTags(true)}
        />
        {showTags && (
          <div className="tags-container">
            <div className="tags-label">Tags (optional):</div>
            <div className="tags-list">
              {DEFAULT_TAGS.map(tag => (
                <label key={tag} className="tag-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  <span className="tag-label">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <button type="submit" className="submit-button" disabled={!text.trim() || isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Add Idea'}
      </button>
    </form>
  );
}

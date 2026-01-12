'use client';

import { useState } from 'react';
import { Idea } from '@/types/idea';

interface SurfacingButtonProps {
  ideas: Idea[];
}

export default function SurfacingButton({ ideas }: SurfacingButtonProps) {
  const [suggestions, setSuggestions] = useState<Idea[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getRandomSuggestions = () => {
    const activeIdeas = ideas.filter(idea => !idea.done);
    
    if (activeIdeas.length === 0) {
      setSuggestions([]);
      setShowSuggestions(true);
      return;
    }

    // Shuffle and pick 3-5 ideas
    const shuffled = [...activeIdeas].sort(() => Math.random() - 0.5);
    const count = Math.min(shuffled.length, Math.floor(Math.random() * 3) + 3);
    setSuggestions(shuffled.slice(0, count));
    setShowSuggestions(true);
  };

  const closeSuggestions = () => {
    setShowSuggestions(false);
  };

  return (
    <>
      <button
        onClick={getRandomSuggestions}
        className="surfacing-button"
      >
        What should I do?
      </button>

      {showSuggestions && (
        <div className="suggestions-modal" onClick={closeSuggestions}>
          <div className="suggestions-content" onClick={(e) => e.stopPropagation()}>
            <div className="suggestions-header">
              <h2>Here are some ideas for you:</h2>
              <button onClick={closeSuggestions} className="close-button">×</button>
            </div>
            {suggestions.length === 0 ? (
              <p className="no-suggestions">No active ideas yet. Add some ideas first!</p>
            ) : (
              <div className="suggestions-list">
                {suggestions.map(idea => (
                  <div key={idea.id} className="suggestion-item">
                    <p className="suggestion-text">{idea.text}</p>
                    {idea.tags.length > 0 && (
                      <div className="suggestion-tags">
                        {idea.tags.map(tag => (
                          <span key={tag} className="tag-badge small">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={getRandomSuggestions}
              className="shuffle-button"
            >
              Shuffle Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}

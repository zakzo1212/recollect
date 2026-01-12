"use client";

import { useState, useMemo } from "react";
import { Idea, DEFAULT_TAGS } from "@/types/idea";
import IdeaCard from "./IdeaCard";

interface IdeasListProps {
  ideas: Idea[];
  onUpdate: () => void;
}

export default function IdeasList({ ideas, onUpdate }: IdeasListProps) {
  const [showDone, setShowDone] = useState(false);
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(
    null
  );

  const filteredIdeas = useMemo(() => {
    let filtered = ideas;

    // Filter by done status
    if (!showDone) {
      filtered = filtered.filter((idea) => !idea.done);
    }

    // Filter by tag
    if (selectedTagFilter) {
      filtered = filtered.filter((idea) =>
        idea.tags.includes(selectedTagFilter)
      );
    }

    // Sort by creation date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [ideas, showDone, selectedTagFilter]);

  const activeIdeas = ideas.filter((idea) => !idea.done);

  return (
    <div className="ideas-list-container">
      <div className="filters">
        <label className="filter-toggle">
          <input
            type="checkbox"
            checked={showDone}
            onChange={(e) => setShowDone(e.target.checked)}
          />
          <span>Show completed ideas</span>
        </label>

        <div className="tag-filters">
          <button
            onClick={() => setSelectedTagFilter(null)}
            className={`tag-filter-button ${
              selectedTagFilter === null ? "active" : ""
            }`}
          >
            All
          </button>
          {DEFAULT_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTagFilter(tag)}
              className={`tag-filter-button ${
                selectedTagFilter === tag ? "active" : ""
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredIdeas.length === 0 ? (
        <div className="empty-state">
          {activeIdeas.length === 0 ? (
            <>
              <p className="empty-message">No ideas yet. Start adding some!</p>
              <p className="empty-hint">
                What would you like to do this weekend?
              </p>
            </>
          ) : (
            <p className="empty-message">
              No ideas match your filters. Try adjusting them!
            </p>
          )}
        </div>
      ) : (
        <div className="ideas-grid">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}

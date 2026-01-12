'use client';

import { useState, useEffect } from 'react';
import { Idea } from '@/types/idea';
import { getIdeas } from '@/lib/storage';
import IdeaForm from '@/components/IdeaForm';
import IdeasList from '@/components/IdeasList';
import SurfacingButton from '@/components/SurfacingButton';

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadIdeas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedIdeas = await getIdeas();
      setIdeas(fetchedIdeas);
    } catch (err) {
      console.error('Error loading ideas:', err);
      setError('Failed to load ideas. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  return (
    <main className="main-container">
      <header className="app-header">
        <h1 className="app-title">🌿 Recollect</h1>
        <p className="app-subtitle">Your personal idea surfaces</p>
      </header>

      <div className="content-wrapper">
        <div className="quick-capture-section">
          <SurfacingButton ideas={ideas} />
          <IdeaForm onIdeaAdded={loadIdeas} />
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadIdeas} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="loading-state">
            <p>Loading your ideas...</p>
          </div>
        ) : (
          <IdeasList ideas={ideas} onUpdate={loadIdeas} />
        )}
      </div>
    </main>
  );
}

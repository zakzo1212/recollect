'use client';

import { useState, useEffect } from 'react';
import { Idea } from '@/types/idea';
import { getIdeas } from '@/lib/storage';
import { useAuth } from '@/contexts/AuthContext';
import IdeaForm from '@/components/IdeaForm';
import IdeasList from '@/components/IdeasList';
import SurfacingButton from '@/components/SurfacingButton';
import AuthButton from '@/components/AuthButton';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadIdeas = async () => {
    if (!user) {
      setIdeas([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const fetchedIdeas = await getIdeas();
      setIdeas(fetchedIdeas);
    } catch (err: any) {
      console.error('Error loading ideas:', err);
      if (err.message?.includes('Unauthorized')) {
        setError('Please sign in to view your ideas.');
      } else {
        setError('Failed to load ideas. Please refresh the page.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      loadIdeas();
    }
  }, [user, authLoading]);

  return (
    <main className="main-container">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1 className="app-title">🌿 Recollect</h1>
            <p className="app-subtitle">Your personal idea surfaces</p>
          </div>
          <AuthButton />
        </div>
      </header>

      {authLoading ? (
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      ) : !user ? (
        <div className="auth-required">
          <div className="auth-required-content">
            <h2>Welcome to Recollect</h2>
            <p>Sign in with Google to start capturing and organizing your ideas.</p>
            <AuthButton />
          </div>
        </div>
      ) : (
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
      )}
    </main>
  );
}

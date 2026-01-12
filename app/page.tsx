'use client';

import { useState, useEffect } from 'react';
import { Idea } from '@/types/idea';
import { getIdeas } from '@/lib/storage';
import IdeaForm from '@/components/IdeaForm';
import IdeasList from '@/components/IdeasList';
import SurfacingButton from '@/components/SurfacingButton';

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const loadIdeas = () => {
    setIdeas(getIdeas());
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

        <IdeasList ideas={ideas} onUpdate={loadIdeas} />
      </div>
    </main>
  );
}

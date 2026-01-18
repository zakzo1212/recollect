'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function AuthButton() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Failed to sign in. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Failed to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-button">
        <span>Loading...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="auth-section">
        <div className="user-info">
          <span className="user-email">{user.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="auth-button sign-out-button"
        >
          {isSigningOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isSigningIn}
      className="auth-button sign-in-button"
    >
      {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
    </button>
  );
}

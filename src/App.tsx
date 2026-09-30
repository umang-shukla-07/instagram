import React, { useState, useEffect } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { AuthView } from './types/auth';
import { PhoneMockup } from './components/PhoneMockup';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { UpdatePasswordForm } from './components/UpdatePasswordForm';
import { InstagramApp } from './components/InstagramApp';
import { Footer } from './components/Footer';
import { InstagramGlyph, MetaLogo } from './components/InstagramLogo';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AuthView>('signin');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check for recovery tokens in URL query or hash
    const checkRecoveryHash = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      if (
        hash.includes('type=recovery') ||
        search.includes('type=recovery') ||
        hash.includes('access_token')
      ) {
        setView('update-password');
      }
    };
    checkRecoveryHash();

    // 2. Fetch current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 3. Listen to auth state transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (event === 'PASSWORD_RECOVERY') {
        setView('update-password');
      } else if (event === 'SIGNED_IN') {
        // Redirection to protected route occurs automatically because user is present
        setNotification('Successfully signed in to Instagram.');
        setTimeout(() => setNotification(null), 3000);
      } else if (event === 'SIGNED_OUT') {
        setView('signin');
        setNotification('Signed out.');
        setTimeout(() => setNotification(null), 3000);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Full-screen Instagram initial loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-between py-12">
        <div />
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 p-[2.5px] shadow-lg animate-pulse">
            <div className="w-full h-full bg-white rounded-[13px] flex items-center justify-center">
              <InstagramGlyph size={34} className="text-[#262626]" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-xs text-[#737373]">
          <span>from</span>
          <MetaLogo size={14} className="text-[#737373]" />
        </div>
      </div>
    );
  }

  // PROTECTED ROUTE REDIRECTION:
  // If the user is authenticated and not explicitly resetting their password, show the protected Instagram App!
  if (user && view !== 'update-password') {
    return (
      <InstagramApp
        user={user}
        onSignOut={() => {
          setSession(null);
          setUser(null);
          setView('signin');
        }}
        onNavigateToUpdatePassword={() => setView('update-password')}
      />
    );
  }

  // AUTHENTICATION INTERFACES
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#262626] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg animate-fadeIn flex items-center gap-2">
          <span>{notification}</span>
        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-[900px] flex items-center justify-center gap-8">
          {/* Left phone mockup is shown on 'signin' and 'signup' for large screens */}
          {(view === 'signin' || view === 'signup') && <PhoneMockup />}

          {/* Right Form Card */}
          <div className="flex flex-col items-center">
            {view === 'signin' && (
              <LoginForm
                onNavigateToSignup={() => setView('signup')}
                onNavigateToForgotPassword={() => setView('forgot-password')}
                onLoginSuccess={() => {
                  // Protected route handles render
                }}
              />
            )}

            {view === 'signup' && (
              <SignUpForm
                onNavigateToLogin={() => setView('signin')}
                onSignUpSuccess={() => {
                  // If auto session created, protected route renders
                }}
              />
            )}

            {view === 'forgot-password' && (
              <ForgotPasswordForm
                onNavigateToLogin={() => setView('signin')}
                onNavigateToSignup={() => setView('signup')}
              />
            )}

            {view === 'update-password' && (
              <UpdatePasswordForm
                onSuccess={() => {
                  setView('signin');
                  setNotification('Password successfully reset. You can now log in.');
                  setTimeout(() => setNotification(null), 4000);
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* Instagram Classic Meta Footer */}
      <Footer />
    </div>
  );
}

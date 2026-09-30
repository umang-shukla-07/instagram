import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { InstagramWordmark, FacebookLogo, AppStoreBadge, GooglePlayBadge } from './InstagramLogo';
import { Loader2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onNavigateToSignup: () => void;
  onNavigateToForgotPassword: () => void;
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onNavigateToSignup,
  onNavigateToForgotPassword,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormValid = email.trim().length > 0 && password.length >= 6;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setErrorMessage(
            'Sorry, your password or email was incorrect. Please double-check your credentials.'
          );
        } else if (error.message.toLowerCase().includes('email not confirmed')) {
          setErrorMessage(
            'Your email has not been confirmed yet. Please verify via the link sent to your inbox, or check your Supabase Auth settings.'
          );
        } else {
          setErrorMessage(error.message);
        }
      } else if (data.session) {
        onLoginSuccess?.();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[350px] flex flex-col items-center">
      {/* Primary Card */}
      <div className="w-full bg-white border border-[#dbdbdb] rounded-sm py-10 px-8 sm:px-10 flex flex-col items-center shadow-xs">
        {/* Instagram Brand Wordmark */}
        <div className="mb-8 mt-2">
          <InstagramWordmark />
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="w-full mb-5 p-3.5 bg-red-50/90 border border-red-200 rounded-md text-[13px] text-red-600 flex items-start gap-2.5 animate-fadeIn leading-snug">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
          {/* Email / Username field */}
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
              autoComplete="username"
              placeholder="Email address"
              className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e] transition-colors"
            />
          </div>

          {/* Password field */}
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              autoComplete="current-password"
              placeholder="Password"
              className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] pr-14 text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e] transition-colors"
            />
            {password.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#262626] hover:text-[#737373] select-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full mt-2 py-1.5 px-4 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              isFormValid && !loading
                ? 'bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer shadow-xs active:opacity-90'
                : 'bg-[#4cb5f9] opacity-70 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Logging in...</span>
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="w-full flex items-center my-5">
          <div className="flex-1 h-[1px] bg-[#dbdbdb]" />
          <span className="px-4 text-xs font-semibold text-[#737373] uppercase tracking-wider">
            OR
          </span>
          <div className="flex-1 h-[1px] bg-[#dbdbdb]" />
        </div>

        {/* Facebook Login Alternative */}
        <button
          type="button"
          onClick={() => {
            alert('Facebook authentication can be configured in your Supabase Auth Providers dashboard.');
          }}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-[#385185] hover:text-[#00376b] transition-colors cursor-pointer select-none"
        >
          <FacebookLogo size={18} />
          <span>Log in with Facebook</span>
        </button>

        {/* Forgot Password Link */}
        <button
          type="button"
          onClick={onNavigateToForgotPassword}
          className="mt-4 text-xs text-[#00376b] hover:text-[#001f3f] hover:underline cursor-pointer select-none"
        >
          Forgot password?
        </button>
      </div>

      {/* Switch to Sign Up Box */}
      <div className="w-full bg-white border border-[#dbdbdb] rounded-sm py-5 px-6 mt-2.5 text-center text-sm text-[#262626] shadow-xs">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onNavigateToSignup}
          className="font-semibold text-[#0095f6] hover:text-[#00376b] cursor-pointer"
        >
          Sign up
        </button>
      </div>

      {/* App Store Links */}
      <div className="flex flex-col items-center mt-4">
        <span className="text-sm text-[#262626] mb-3">Get the app.</span>
        <div className="flex items-center gap-2">
          <AppStoreBadge />
          <GooglePlayBadge />
        </div>
      </div>
    </div>
  );
};

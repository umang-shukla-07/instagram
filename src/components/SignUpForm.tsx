import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { InstagramWordmark, FacebookLogo, AppStoreBadge, GooglePlayBadge } from './InstagramLogo';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SignUpFormProps {
  onNavigateToLogin: () => void;
  onSignUpSuccess?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onNavigateToLogin,
  onSignUpSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isFormValid =
    email.trim().length > 0 &&
    fullName.trim().length > 0 &&
    username.trim().length >= 3 &&
    password.length >= 6;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9._]/g, '');

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            username: cleanUsername,
            avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              cleanUsername
            )}`,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data.user) {
        // If Supabase has email confirmation enabled
        if (data.session) {
          setSuccessMessage('Account created successfully! Logging you in...');
          setTimeout(() => {
            onSignUpSuccess?.();
          }, 1200);
        } else {
          setSuccessMessage(
            'Account created! A confirmation link has been sent to your email. Please check your inbox to activate your account.'
          );
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to register account.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[350px] flex flex-col items-center">
      {/* Primary Card */}
      <div className="w-full bg-white border border-[#dbdbdb] rounded-sm py-8 px-8 sm:px-10 flex flex-col items-center shadow-xs">
        {/* Instagram Brand Wordmark */}
        <div className="mb-3 mt-1">
          <InstagramWordmark />
        </div>

        <p className="text-center text-sm font-semibold text-[#737373] mb-4 leading-snug">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Facebook Action Button */}
        <button
          type="button"
          onClick={() => {
            alert('Facebook OAuth can be configured directly inside your Supabase project dashboard.');
          }}
          className="w-full py-1.5 px-4 bg-[#0095f6] hover:bg-[#1877f2] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
        >
          <FacebookLogo className="text-white" size={18} />
          <span>Log in with Facebook</span>
        </button>

        {/* OR Divider */}
        <div className="w-full flex items-center my-4">
          <div className="flex-1 h-[1px] bg-[#dbdbdb]" />
          <span className="px-4 text-xs font-semibold text-[#737373] uppercase tracking-wider">
            OR
          </span>
          <div className="flex-1 h-[1px] bg-[#dbdbdb]" />
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-[13px] text-red-600 flex items-start gap-2 animate-fadeIn leading-snug">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="w-full mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md text-[13px] text-emerald-800 flex items-start gap-2 animate-fadeIn leading-snug">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">{successMessage}</div>
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-2">
          {/* Email */}
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
              placeholder="Email address"
              className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e] transition-colors"
            />
          </div>

          {/* Full Name */}
          <div className="relative w-full">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              aria-label="Full Name"
              placeholder="Full Name"
              className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e] transition-colors"
            />
          </div>

          {/* Username */}
          <div className="relative w-full">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
              placeholder="Username"
              className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              placeholder="Password (min 6 characters)"
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

          {/* Policy Text */}
          <div className="my-2 text-[11px] text-[#737373] text-center leading-relaxed">
            People who use our service may have uploaded your contact information to Instagram.{' '}
            <span className="text-[#00376b] font-medium hover:underline cursor-pointer">
              Learn More
            </span>
            <div className="mt-2">
              By signing up, you agree to our{' '}
              <span className="text-[#00376b] font-medium hover:underline cursor-pointer">Terms</span>,{' '}
              <span className="text-[#00376b] font-medium hover:underline cursor-pointer">
                Privacy Policy
              </span>{' '}
              and{' '}
              <span className="text-[#00376b] font-medium hover:underline cursor-pointer">
                Cookies Policy
              </span>
              .
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-1.5 px-4 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              isFormValid && !loading
                ? 'bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer shadow-xs active:opacity-90'
                : 'bg-[#4cb5f9] opacity-70 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Signing up...</span>
              </>
            ) : (
              'Sign up'
            )}
          </button>
        </form>
      </div>

      {/* Switch to Log In Box */}
      <div className="w-full bg-white border border-[#dbdbdb] rounded-sm py-5 px-6 mt-2.5 text-center text-sm text-[#262626] shadow-xs">
        Have an account?{' '}
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="font-semibold text-[#0095f6] hover:text-[#00376b] cursor-pointer"
        >
          Log in
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

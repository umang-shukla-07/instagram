import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Loader2, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onNavigateToLogin,
  onNavigateToSignup,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const isFormValid = email.trim().length > 0 && email.includes('@');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Set the redirectTo to the current app URL so clicking the link returns to the app
      const redirectTo = `${window.location.origin}?type=recovery`;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setEmailSent(true);
        setResendCooldown(60);
        const interval = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to send reset email. Please try again.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[388px] flex flex-col items-center">
      {/* Primary Card */}
      <div className="w-full bg-white border border-[#dbdbdb] rounded-sm pt-8 pb-4 px-8 sm:px-11 flex flex-col items-center shadow-xs">
        {/* Lock Glyph Circle */}
        <div className="w-24 h-24 rounded-full border-2 border-[#262626] flex items-center justify-center mb-4 text-[#262626]">
          <Lock className="w-10 h-10 stroke-[1.75]" />
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-[#262626] mb-2 text-center">
          {emailSent ? 'Email Sent' : 'Trouble logging in?'}
        </h2>

        {/* Subtitle / Description */}
        <p className="text-sm text-[#737373] text-center mb-5 leading-normal">
          {emailSent ? (
            <span>
              We sent an email to <strong className="text-[#262626]">{email}</strong> with a link
              to get back into your account.
            </span>
          ) : (
            'Enter your email, phone, or username and we will send you a link to get back into your account.'
          )}
        </p>

        {/* Error Alert */}
        {errorMessage && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-[13px] text-red-600 flex items-start gap-2 leading-snug">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {emailSent ? (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs flex items-center gap-2 w-full">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Password reset link dispatched via Supabase Auth</span>
            </div>

            <button
              type="button"
              disabled={resendCooldown > 0 || loading}
              onClick={handleResetPassword}
              className="text-xs font-semibold text-[#0095f6] hover:text-[#00376b] disabled:text-[#8e8e8e] cursor-pointer disabled:cursor-not-allowed mt-2"
            >
              {resendCooldown > 0 ? `Resend email in ${resendCooldown}s` : 'Resend reset link'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-3">
            {/* Email Input */}
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email, Phone, or Username"
                placeholder="Email address"
                className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e] transition-colors"
              />
            </div>

            {/* Send Login Link Button */}
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
                  <span>Sending link...</span>
                </>
              ) : (
                'Send login link'
              )}
            </button>
          </form>
        )}

        {/* Can't reset helper */}
        <a
          href="https://help.instagram.com/374546259294234"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#00376b] hover:text-[#001f3f] mt-4 mb-3"
        >
          Can&apos;t reset your password?
        </a>

        {/* OR Divider */}
        <div className="w-full flex items-center my-3">
          <div className="flex-1 h-[1px] bg-[#dbdbdb]" />
          <span className="px-4 text-xs font-semibold text-[#737373] uppercase tracking-wider">
            OR
          </span>
          <div className="flex-1 h-[1px] bg-[#dbdbdb]" />
        </div>

        {/* Create new account link */}
        <button
          type="button"
          onClick={onNavigateToSignup}
          className="text-sm font-semibold text-[#262626] hover:text-[#737373] cursor-pointer mb-2"
        >
          Create new account
        </button>
      </div>

      {/* Bottom Bar: Back to login */}
      <button
        type="button"
        onClick={onNavigateToLogin}
        className="w-full bg-[#fafafa] border border-[#dbdbdb] border-t-0 rounded-b-sm py-3 text-center text-sm font-semibold text-[#262626] hover:bg-neutral-100 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to login</span>
      </button>
    </div>
  );
};

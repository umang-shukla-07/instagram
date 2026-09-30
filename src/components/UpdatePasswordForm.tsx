import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface UpdatePasswordFormProps {
  onSuccess: () => void;
}

export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ onSuccess }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isFormValid =
    newPassword.length >= 6 && newPassword === confirmPassword;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update password.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[388px] flex flex-col items-center">
      <div className="w-full bg-white border border-[#dbdbdb] rounded-sm py-8 px-8 sm:px-11 flex flex-col items-center shadow-xs">
        {/* Lock Glyph */}
        <div className="w-20 h-20 rounded-full border-2 border-[#262626] flex items-center justify-center mb-4 text-[#262626]">
          <Lock className="w-9 h-9 stroke-[1.75]" />
        </div>

        <h2 className="text-base font-semibold text-[#262626] mb-2 text-center">
          Create A Strong Password
        </h2>

        <p className="text-xs text-[#737373] text-center mb-5 leading-normal">
          Your password must be at least 6 characters and should include a combination of numbers,
          letters and special characters (!$@%).
        </p>

        {errorMessage && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-[13px] text-red-600 flex items-start gap-2 leading-snug">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {success && (
          <div className="w-full mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md text-[13px] text-emerald-800 flex items-start gap-2 leading-snug">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1">Password updated successfully! Redirecting...</div>
          </div>
        )}

        <form onSubmit={handleUpdate} className="w-full flex flex-col gap-3">
          {/* New password */}
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="New password"
              className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] pr-14 text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e]"
            />
            {newPassword.length > 0 && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#262626] hover:text-[#737373]"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            )}
          </div>

          {/* Confirm password */}
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              className="w-full bg-[#fafafa] border border-[#dbdbdb] focus:border-[#a8a8a8] rounded-[3px] px-2.5 py-[9px] text-xs text-[#262626] focus:outline-none placeholder:text-[#8e8e8e]"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full mt-2 py-1.5 px-4 rounded-lg text-sm font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              isFormValid && !loading
                ? 'bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer shadow-xs'
                : 'bg-[#4cb5f9] opacity-70 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Updating password...</span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

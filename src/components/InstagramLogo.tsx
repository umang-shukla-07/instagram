import React from 'react';

export const InstagramWordmark: React.FC<{ className?: string }> = ({
  className = 'h-12 w-auto',
}) => {
  return (
    <span
      className={`font-instagram text-[42px] tracking-tight text-[#262626] select-none ${className}`}
      style={{ lineHeight: 1 }}
    >
      Instagram
    </span>
  );
};

export const InstagramGlyph: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-[#262626]',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
};

export const FacebookLogo: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-[#385185]',
  size = 20,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
};

export const MetaLogo: React.FC<{ className?: string; size?: number }> = ({
  className = 'text-[#737373]',
  size = 14,
}) => {
  return (
    <svg
      width={size * 1.5}
      height={size}
      viewBox="0 0 76 50"
      fill="currentColor"
      className={className}
    >
      <path d="M52.88 4.09C48.24 4.09 43.89 6.27 40.8 9.94C38.07 6.13 33.72 4.09 29.08 4.09C20.67 4.09 13.9 10.94 13.9 19.46C13.9 31.79 26.65 42.12 37.91 47.96C39.73 48.91 41.87 48.91 43.69 47.96C54.95 42.12 67.7 31.79 67.7 19.46C67.7 10.94 60.93 4.09 52.88 4.09ZM40.8 41.31C31.54 36.43 20.9 27.69 20.9 19.46C20.9 14.86 24.58 11.09 29.08 11.09C33.15 11.09 36.93 13.88 38.83 17.58L40.8 21.43L42.77 17.58C44.67 13.88 48.45 11.09 52.52 11.09C57.02 11.09 60.7 14.86 60.7 19.46C60.7 27.69 50.06 36.43 40.8 41.31Z" />
    </svg>
  );
};

export const AppStoreBadge: React.FC = () => {
  return (
    <a
      href="https://apps.apple.com/app/instagram/id389801252"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center h-10 px-3 py-1 bg-black text-white rounded-md hover:opacity-90 transition-opacity"
    >
      <svg className="w-5 h-5 mr-1.5 fill-current" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.01.62-2.65 1.37-.56.64-1.04 1.71-.91 2.73 1.03.08 2.05-.53 2.64-1.25" />
      </svg>
      <div className="text-left leading-tight">
        <div className="text-[9px] uppercase tracking-wider text-slate-300">Download on the</div>
        <div className="text-xs font-semibold">App Store</div>
      </div>
    </a>
  );
};

export const GooglePlayBadge: React.FC = () => {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.instagram.android"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center h-10 px-3 py-1 bg-black text-white rounded-md hover:opacity-90 transition-opacity"
    >
      <svg className="w-5 h-5 mr-1.5 fill-current" viewBox="0 0 24 24">
        <path d="M3.609 1.814L13.792 12 3.61 22.186c-.347-.306-.554-.75-.554-1.259V3.073c0-.509.207-.953.553-1.259zm11.235 11.238l2.308 2.308-11.45 6.505 9.142-8.813zm0-2.104L5.702 2.135l11.45 6.505-2.308 2.308zm1.096 1.052l3.411 1.938c.636.362.636.953 0 1.314l-3.411 1.938-2.023-2.023 2.023-2.167z" />
      </svg>
      <div className="text-left leading-tight">
        <div className="text-[9px] uppercase tracking-wider text-slate-300">GET IT ON</div>
        <div className="text-xs font-semibold">Google Play</div>
      </div>
    </a>
  );
};

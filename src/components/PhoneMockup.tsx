import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface Slide {
  id: number;
  user: string;
  avatarBg: string;
  location: string;
  caption: string;
  likes: string;
  themeGradient: string;
  sceneVisual: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    user: 'sophia.creative',
    avatarBg: 'from-amber-400 to-pink-500',
    location: 'Positano, Italy',
    caption: 'Golden hour along the cliffside. Never leaving this slice of paradise 🌊✨',
    likes: '14,892',
    themeGradient: 'from-amber-100 via-rose-100 to-sky-200',
    sceneVisual: (
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-amber-400 via-rose-400 to-indigo-600 flex items-center justify-center">
        {/* Sun and cliff layers */}
        <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-amber-200/80 blur-sm" />
        <div className="absolute bottom-0 w-full h-28 bg-gradient-to-t from-slate-900/60 to-transparent" />
        {/* Coastal silhouette */}
        <svg
          className="absolute bottom-0 w-full h-36 text-amber-950/40 fill-current"
          viewBox="0 0 300 120"
          preserveAspectRatio="none"
        >
          <path d="M0,120 L0,50 Q40,30 90,65 T180,45 Q230,20 300,70 L300,120 Z" />
        </svg>
        <div className="relative text-center text-white px-4">
          <p className="text-xs uppercase tracking-widest text-white/80 font-medium">Summer Series</p>
          <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-md">Amalfi Coast</h3>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    user: 'coffeeculture.mag',
    avatarBg: 'from-amber-600 to-yellow-500',
    location: 'Kyoto, Japan',
    caption: 'Morning ritual: single-origin pour over and quiet architecture ☕🍵',
    likes: '8,410',
    themeGradient: 'from-stone-200 via-orange-100 to-amber-200',
    sceneVisual: (
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-stone-800 via-stone-700 to-amber-900 flex items-center justify-center">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-amber-500/20 blur-2xl" />
        {/* Cup flatlay illustration */}
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-amber-100/30 bg-stone-900/80 flex items-center justify-center shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-amber-800 flex items-center justify-center border border-amber-600/50">
              <div className="w-8 h-8 rounded-full bg-amber-900/60 border border-amber-300/40" />
            </div>
          </div>
          <span className="mt-4 text-xs font-semibold tracking-wider text-amber-200/90 uppercase">
            Slow Living Journal
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    user: 'studio_arch',
    avatarBg: 'from-emerald-400 to-teal-600',
    location: 'Copenhagen, Denmark',
    caption: 'Clean geometric lines & diffused Nordic daylight. Form following serenity.',
    likes: '19,204',
    themeGradient: 'from-cyan-100 via-slate-100 to-teal-100',
    sceneVisual: (
      <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
        {/* Modernist architectural arches */}
        <div className="relative flex items-end gap-3 h-48">
          <div className="w-12 h-36 bg-gradient-to-t from-teal-500/40 to-emerald-300/20 rounded-t-full border-t border-l border-r border-teal-300/30" />
          <div className="w-16 h-48 bg-gradient-to-t from-teal-400/50 to-emerald-200/30 rounded-t-full border-t border-l border-r border-teal-200/40" />
          <div className="w-10 h-28 bg-gradient-to-t from-teal-600/40 to-emerald-400/20 rounded-t-full border-t border-l border-r border-teal-400/30" />
        </div>
      </div>
    ),
  },
];

export const PhoneMockup: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative select-none hidden lg:block">
      {/* Phone Hardware Container */}
      <div className="relative w-[340px] h-[580px] bg-[#121212] rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-[#2d2d2d] ring-1 ring-black/40">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700/60 mr-1" />
        </div>

        {/* Side physical buttons (visual details) */}
        <div className="absolute -left-[7px] top-28 w-1 h-10 bg-[#3a3a3a] rounded-l" />
        <div className="absolute -left-[7px] top-42 w-1 h-10 bg-[#3a3a3a] rounded-l" />
        <div className="absolute -right-[7px] top-32 w-1 h-14 bg-[#3a3a3a] rounded-r" />

        {/* Screen Display Area */}
        <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col border border-neutral-200/80">
          {/* Top Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-neutral-800 bg-white z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 21l3.54-.77C9.36 20.67 10.64 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
              </svg>
              <div className="w-5 h-2.5 border border-neutral-800 rounded-sm p-0.5 flex items-center">
                <div className="h-full w-full bg-neutral-800 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Stories Bar */}
          <div className="px-3 py-2 border-b border-neutral-100 flex items-center gap-2.5 overflow-hidden bg-white">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer focus:outline-none"
              >
                <div
                  className={`p-[2px] rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 scale-105'
                      : 'bg-neutral-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-white p-[1.5px]">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-tr ${s.avatarBg} flex items-center justify-center text-white text-[11px] font-bold`}
                    >
                      {s.user.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>
                <span className="text-[9px] text-neutral-600 max-w-[42px] truncate">
                  {s.user.split('.')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Post Header */}
          <div className="px-3 py-2 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-tr ${slide.avatarBg} flex items-center justify-center text-white text-[10px] font-bold`}
              >
                {slide.user.charAt(0).toUpperCase()}
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-semibold text-neutral-900 flex items-center gap-1">
                  {slide.user}
                  <span className="w-1 h-1 rounded-full bg-sky-500" />
                </div>
                <div className="text-[9px] text-neutral-500">{slide.location}</div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-neutral-600" />
          </div>

          {/* Media Viewport */}
          <div className="relative flex-1 w-full overflow-hidden bg-neutral-900">
            {slides.map((s, index) => (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {s.sceneVisual}
              </div>
            ))}
          </div>

          {/* Post Actions & Meta */}
          <div className="p-3 bg-white border-t border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 text-neutral-800">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <MessageCircle className="w-5 h-5" />
                <Send className="w-5 h-5" />
              </div>
              <Bookmark className="w-5 h-5 text-neutral-800" />
            </div>

            <div className="text-[11px] font-semibold text-neutral-900 mb-1">
              {slide.likes} likes
            </div>

            <p className="text-[10px] text-neutral-800 line-clamp-2 leading-relaxed">
              <span className="font-semibold mr-1">{slide.user}</span>
              {slide.caption}
            </p>

            <div className="text-[9px] text-neutral-400 mt-1 uppercase font-medium">
              2 hours ago
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex justify-center items-center gap-1.5 mt-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-4 bg-[#0095f6]' : 'w-1.5 bg-neutral-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

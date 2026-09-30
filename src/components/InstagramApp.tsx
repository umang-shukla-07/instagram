import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { InstagramWordmark } from './InstagramLogo';
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  LogOut,
  Bookmark,
  Share2,
  MoreHorizontal,
  Smile,
  Check,
  ShieldCheck,
  Key,
  User as UserIcon,
} from 'lucide-react';
import { PostItem, StoryItem } from '../types/auth';

interface InstagramAppProps {
  user: User;
  onSignOut: () => void;
  onNavigateToUpdatePassword?: () => void;
}

const initialStories: StoryItem[] = [
  { id: '1', username: 'elena_travels', avatarUrl: 'from-pink-500 to-rose-500', hasUnseen: true },
  { id: '2', username: 'design.daily', avatarUrl: 'from-amber-400 to-orange-500', hasUnseen: true },
  { id: '3', username: 'artisan_baker', avatarUrl: 'from-yellow-400 to-amber-600', hasUnseen: true },
  { id: '4', username: 'marcus.sound', avatarUrl: 'from-emerald-400 to-teal-600', hasUnseen: true },
  { id: '5', username: 'street_lens', avatarUrl: 'from-blue-500 to-indigo-600', hasUnseen: false },
  { id: '6', username: 'nordic_living', avatarUrl: 'from-violet-500 to-purple-600', hasUnseen: false },
];

const initialPosts: PostItem[] = [
  {
    id: 'p1',
    username: 'amalfi_explorations',
    avatarUrl: 'from-blue-400 to-indigo-600',
    verified: true,
    location: 'Amalfi Coast, Italy',
    imageUrl: 'coast',
    caption: 'Salt air and turquoise horizons. Summer in southern Italy never gets old 🍋🌊 #italy #wanderlust',
    likes: 1243,
    isLiked: false,
    isSaved: false,
    timestamp: '3 HOURS AGO',
    comments: [
      { username: 'clara_voyage', text: 'The light is pure magic here! 😍', time: '2h' },
      { username: 'luca_photo', text: 'Stunning capture mate 👏', time: '1h' },
    ],
  },
  {
    id: 'p2',
    username: 'minimalist_interiors',
    avatarUrl: 'from-stone-500 to-amber-700',
    verified: true,
    location: 'Stockholm, Sweden',
    imageUrl: 'interior',
    caption: 'Soft diffused natural light, warm oak, and timeless silence. Designing spaces to breathe in.',
    likes: 3890,
    isLiked: true,
    isSaved: true,
    timestamp: '5 HOURS AGO',
    comments: [
      { username: 'arch_digest', text: 'Incredible spatial balance!', time: '4h' },
    ],
  },
];

export const InstagramApp: React.FC<InstagramAppProps> = ({
  user,
  onSignOut,
  onNavigateToUpdatePassword,
}) => {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'profile'>('home');
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>({});

  const userEmail = user.email || 'user@example.com';
  const username =
    user.user_metadata?.username ||
    userEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9._]/g, '');
  const userFullName = user.user_metadata?.full_name || username;

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextLiked = !post.isLiked;
          return {
            ...post,
            isLiked: nextLiked,
            likes: nextLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const handleToggleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post))
    );
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              { username: username, text: commentText, time: 'Just now' },
            ],
          };
        }
        return post;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const toggleFollow = (suggestedUser: string) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [suggestedUser]: !prev[suggestedUser],
    }));
  };

  const handleSignOutClick = async () => {
    await supabase.auth.signOut();
    onSignOut();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen sticky top-0 border-r border-[#dbdbdb] bg-white px-4 py-8 justify-between z-30">
        <div>
          {/* Logo */}
          <div className="px-3 mb-8 cursor-pointer" onClick={() => setActiveTab('home')}>
            <InstagramWordmark className="text-[34px]" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'home' ? 'text-black font-bold' : 'text-[#262626] hover:bg-neutral-100'
              }`}
            >
              <Home className={`w-6 h-6 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'search' ? 'text-black font-bold' : 'text-[#262626] hover:bg-neutral-100'
              }`}
            >
              <Search className="w-6 h-6 stroke-[1.75]" />
              <span>Search</span>
            </button>

            <div className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold text-[#262626] hover:bg-neutral-100 transition-colors cursor-pointer">
              <Compass className="w-6 h-6 stroke-[1.75]" />
              <span>Explore</span>
            </div>

            <div className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold text-[#262626] hover:bg-neutral-100 transition-colors cursor-pointer">
              <Film className="w-6 h-6 stroke-[1.75]" />
              <span>Reels</span>
            </div>

            <div className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold text-[#262626] hover:bg-neutral-100 transition-colors cursor-pointer">
              <MessageCircle className="w-6 h-6 stroke-[1.75]" />
              <span>Messages</span>
            </div>

            <div className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold text-[#262626] hover:bg-neutral-100 transition-colors cursor-pointer">
              <Heart className="w-6 h-6 stroke-[1.75]" />
              <span>Notifications</span>
            </div>

            <div className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold text-[#262626] hover:bg-neutral-100 transition-colors cursor-pointer">
              <PlusSquare className="w-6 h-6 stroke-[1.75]" />
              <span>Create</span>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'profile' ? 'text-black font-bold' : 'text-[#262626] hover:bg-neutral-100'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-[11px] font-bold flex items-center justify-center border border-white shadow-xs">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="truncate">Profile</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions: Account details & Log out */}
        <div className="flex flex-col gap-2 pt-4 border-t border-[#dbdbdb]">
          <button
            onClick={() => setShowAccountModal(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-[#737373] hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="truncate">Supabase Auth Security</span>
          </button>

          <button
            onClick={handleSignOutClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Top Header for Mobile */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#dbdbdb] sticky top-0 z-30">
        <InstagramWordmark className="text-[28px]" />
        <div className="flex items-center gap-4">
          <Heart className="w-6 h-6 stroke-[1.75]" />
          <MessageCircle className="w-6 h-6 stroke-[1.75]" />
          <button onClick={handleSignOutClick} className="text-rose-600">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[935px] mx-auto w-full py-6 px-3 sm:px-6 flex gap-8 justify-center">
        {/* Center Feed Column */}
        <div className="w-full max-w-[470px]">
          {/* Stories Carousel */}
          <div className="bg-white border border-[#dbdbdb] rounded-lg p-4 mb-4 flex items-center gap-4 overflow-x-auto scrollbar-none shadow-xs">
            {/* User Story */}
            <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-lg font-bold flex items-center justify-center border-2 border-white shadow-xs">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#0095f6] text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  +
                </div>
              </div>
              <span className="text-[11px] text-neutral-600 max-w-[60px] truncate">
                Your story
              </span>
            </div>

            {/* Friend Stories */}
            {initialStories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
              >
                <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600">
                  <div className="w-13 h-13 rounded-full bg-white p-[2px]">
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-tr ${story.avatarUrl} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {story.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-600 max-w-[62px] truncate">
                  {story.username}
                </span>
              </div>
            ))}
          </div>

          {/* Protected Route Banner */}
          <div className="mb-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-3.5 flex items-center justify-between text-xs text-sky-900 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="font-semibold">Protected Route Active:</span> Authenticated as{' '}
                <strong className="text-black">{userEmail}</strong>
              </div>
            </div>
            <button
              onClick={() => setShowAccountModal(true)}
              className="text-sky-700 hover:text-sky-900 font-semibold underline cursor-pointer"
            >
              Session Details
            </button>
          </div>

          {/* Posts Feed */}
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-[#dbdbdb] rounded-lg overflow-hidden shadow-xs"
              >
                {/* Post Header */}
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-tr ${post.avatarUrl} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {post.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-[#262626] flex items-center gap-1">
                        {post.username}
                        {post.verified && (
                          <svg className="w-3.5 h-3.5 text-[#0095f6] fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        )}
                      </div>
                      {post.location && (
                        <div className="text-[11px] text-[#737373]">{post.location}</div>
                      )}
                    </div>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-[#737373] cursor-pointer" />
                </div>

                {/* Media Image Presentation */}
                <div
                  onDoubleClick={() => handleToggleLike(post.id)}
                  className="relative w-full aspect-square bg-neutral-900 flex items-center justify-center cursor-pointer select-none overflow-hidden"
                >
                  {post.imageUrl === 'coast' ? (
                    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-cyan-600 via-sky-500 to-amber-400 flex items-center justify-center">
                      <div className="absolute top-8 right-12 w-20 h-20 rounded-full bg-amber-200/80 blur-md" />
                      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />
                      <svg
                        className="absolute bottom-0 w-full h-44 text-slate-900/40 fill-current"
                        viewBox="0 0 400 160"
                        preserveAspectRatio="none"
                      >
                        <path d="M0,160 L0,70 Q70,40 140,85 T280,60 Q340,30 400,90 L400,160 Z" />
                      </svg>
                      <div className="relative text-center text-white px-6">
                        <span className="text-xs uppercase tracking-widest text-amber-200 font-medium">
                          Coastal Light
                        </span>
                        <h4 className="text-2xl font-bold tracking-tight drop-shadow-md">Amalfi Horizons</h4>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-stone-800 via-stone-700 to-amber-950 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />
                      <div className="relative flex flex-col items-center text-white">
                        <div className="w-28 h-28 rounded-2xl border border-amber-200/20 bg-stone-900/60 backdrop-blur-md flex items-center justify-center shadow-2xl mb-3">
                          <div className="w-16 h-16 rounded-xl bg-amber-700/30 border border-amber-400/30 flex items-center justify-center text-amber-200 font-serif text-2xl">
                            Ø
                          </div>
                        </div>
                        <span className="text-xs font-semibold tracking-widest uppercase text-amber-200/90">
                          Nordic Interior Minimal
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4 text-[#262626]">
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
                      >
                        <Heart
                          className={`w-6 h-6 transition-transform active:scale-125 ${
                            post.isLiked ? 'fill-rose-500 text-rose-500' : 'text-[#262626]'
                          }`}
                        />
                      </button>
                      <button className="hover:opacity-60 transition-opacity cursor-pointer">
                        <MessageCircle className="w-6 h-6 text-[#262626]" />
                      </button>
                      <button className="hover:opacity-60 transition-opacity cursor-pointer">
                        <Share2 className="w-6 h-6 text-[#262626]" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleToggleSave(post.id)}
                      className="hover:opacity-60 transition-opacity cursor-pointer"
                    >
                      <Bookmark
                        className={`w-6 h-6 ${
                          post.isSaved ? 'fill-neutral-900 text-neutral-900' : 'text-[#262626]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div className="text-sm font-semibold text-[#262626] mb-1">
                    {post.likes.toLocaleString()} likes
                  </div>

                  {/* Caption */}
                  <div className="text-sm text-[#262626] leading-relaxed mb-1">
                    <span className="font-semibold mr-1.5">{post.username}</span>
                    {post.caption}
                  </div>

                  {/* Comments List */}
                  {post.comments.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2">
                      {post.comments.map((comment, idx) => (
                        <div key={idx} className="text-xs text-[#262626] flex items-start gap-1.5">
                          <span className="font-semibold">{comment.username}</span>
                          <span className="text-[#3f3f3f] flex-1">{comment.text}</span>
                          <span className="text-[10px] text-[#8e8e8e]">{comment.time}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="text-[10px] uppercase tracking-wider text-[#737373] mt-2">
                    {post.timestamp}
                  </div>
                </div>

                {/* Add Comment Input */}
                <form
                  onSubmit={(e) => handleAddComment(post.id, e)}
                  className="border-t border-[#efefef] px-3 py-2.5 flex items-center gap-2"
                >
                  <Smile className="w-5 h-5 text-[#737373]" />
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                    placeholder="Add a comment..."
                    className="flex-1 text-xs text-[#262626] placeholder:text-[#8e8e8e] focus:outline-none bg-transparent"
                  />
                  {(commentInputs[post.id] || '').trim().length > 0 && (
                    <button
                      type="submit"
                      className="text-xs font-semibold text-[#0095f6] hover:text-[#00376b] cursor-pointer"
                    >
                      Post
                    </button>
                  )}
                </form>
              </article>
            ))}
          </div>
        </div>

        {/* Right Rail Sidebar (Desktop) */}
        <aside className="hidden lg:block w-[320px] shrink-0">
          {/* User Profile Card */}
          <div className="flex items-center justify-between py-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-base shadow-xs">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[#262626]">{username}</div>
                <div className="text-xs text-[#737373] max-w-[150px] truncate">{userFullName}</div>
              </div>
            </div>
            <button
              onClick={handleSignOutClick}
              className="text-xs font-semibold text-[#0095f6] hover:text-[#00376b] cursor-pointer"
            >
              Sign out
            </button>
          </div>

          {/* Suggested for You */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#737373]">Suggested for you</span>
              <button className="text-xs font-semibold text-[#262626] hover:text-[#737373]">
                See All
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { name: 'taylor_design', note: 'Followed by elena_travels + 3 more' },
                { name: 'tokyo_frames', note: 'New to Instagram' },
                { name: 'culinary_lab', note: 'Suggested for you' },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 text-xs font-bold">
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-semibold text-[#262626]">{s.name}</div>
                      <div className="text-[10px] text-[#737373] max-w-[140px] truncate">
                        {s.note}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFollow(s.name)}
                    className={`text-xs font-semibold cursor-pointer ${
                      followedUsers[s.name]
                        ? 'text-[#737373] hover:text-black'
                        : 'text-[#0095f6] hover:text-[#00376b]'
                    }`}
                  >
                    {followedUsers[s.name] ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Meta footer in right rail */}
          <div className="pt-6 border-t border-[#efefef] text-[11px] text-[#c7c7c7] leading-relaxed">
            About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language
            <div className="mt-4 text-[#737373]">© 2026 INSTAGRAM FROM META</div>
          </div>
        </aside>
      </main>

      {/* Account / Supabase Session Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Supabase Auth Session</span>
              </div>
              <button
                onClick={() => setShowAccountModal(false)}
                className="text-neutral-400 hover:text-neutral-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 flex flex-col gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg flex flex-col gap-1 border border-neutral-100">
                <span className="text-[10px] uppercase font-semibold text-neutral-500">
                  Authenticated Email
                </span>
                <span className="text-sm font-semibold text-neutral-900">{user.email}</span>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg flex flex-col gap-1 border border-neutral-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-semibold text-neutral-500">
                    Supabase User UUID
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="text-xs text-[#0095f6] hover:underline flex items-center gap-1"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
                <span className="font-mono text-[11px] text-neutral-800 break-all">{user.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-100">
                  <div className="text-[10px] uppercase font-semibold text-neutral-500">Role</div>
                  <div className="text-xs font-semibold text-neutral-900 mt-0.5 capitalize">
                    {user.role || 'authenticated'}
                  </div>
                </div>
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-100">
                  <div className="text-[10px] uppercase font-semibold text-neutral-500">Created At</div>
                  <div className="text-xs font-semibold text-neutral-900 mt-0.5">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Active'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              {onNavigateToUpdatePassword && (
                <button
                  onClick={() => {
                    setShowAccountModal(false);
                    onNavigateToUpdatePassword();
                  }}
                  className="w-full py-2 px-3 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Change Password</span>
                </button>
              )}

              <button
                onClick={handleSignOutClick}
                className="w-full py-2 px-3 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Instagram</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#dbdbdb] py-2.5 px-6 flex items-center justify-between z-30">
        <Home className="w-6 h-6 stroke-[2]" />
        <Search className="w-6 h-6 stroke-[1.75]" />
        <PlusSquare className="w-6 h-6 stroke-[1.75]" />
        <Film className="w-6 h-6 stroke-[1.75]" />
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
          {username.charAt(0).toUpperCase()}
        </div>
      </nav>
    </div>
  );
};

import { User, Session } from '@supabase/supabase-js';

export type AuthView =
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'update-password';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface PostItem {
  id: string;
  username: string;
  avatarUrl: string;
  verified?: boolean;
  location?: string;
  imageUrl: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  comments: { username: string; text: string; time: string }[];
  timestamp: string;
}

export interface StoryItem {
  id: string;
  username: string;
  avatarUrl: string;
  hasUnseen: boolean;
}

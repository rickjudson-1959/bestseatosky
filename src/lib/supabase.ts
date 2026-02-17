import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions matching our database schema
export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  display_order: number;
};

export type Town = {
  id: string;
  slug: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  display_order: number;
};

export type Tag = {
  id: string;
  slug: string;
  name: string;
  category_id: string;
};

export type Listing = {
  id: string;
  slug: string;
  name: string;
  description: string;
  short_description: string;
  category_id: string;
  town_id: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;
  hours: Record<string, { open: string; close: string }>;
  price_level: number;
  google_rating: number;
  google_review_count: number;
  google_place_id: string;
  meta_title: string;
  meta_description: string;
  schema_type: string;
  schema_json: Record<string, unknown>;
  featured_image_url: string;
  images: string[];
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category;
  towns?: Town;
  listing_tags?: { tags: Tag }[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  featured_image: string | null;
  excerpt: string;
  content: string;
  author: string;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type SeoPage = {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  h1_text: string;
  intro_content: string;
  category_id: string | null;
  tag_id: string | null;
  town_id: string | null;
  schema_json: Record<string, unknown> | null;
  canonical_url: string | null;
  status: string;
};

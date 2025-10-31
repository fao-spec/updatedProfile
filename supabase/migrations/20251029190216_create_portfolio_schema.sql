/*
  # Portfolio Database Schema

  ## Overview
  This migration creates the core database structure for a portfolio website with projects and blogs.

  ## New Tables
  
  ### `projects`
  - `id` (uuid, primary key) - Unique identifier for each project
  - `title` (text) - Project title
  - `description` (text) - Project description
  - `url` (text) - Project URL/link
  - `image_url` (text, nullable) - Project thumbnail/image
  - `video_url` (text, nullable) - Project video URL
  - `tags` (text[], nullable) - Array of technology tags
  - `featured` (boolean) - Whether project is featured
  - `order_index` (integer) - For custom ordering
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `blogs`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly slug
  - `content` (text) - Blog post content (markdown supported)
  - `excerpt` (text, nullable) - Short excerpt/summary
  - `image_url` (text, nullable) - Featured image
  - `video_url` (text, nullable) - Embedded video URL
  - `tags` (text[], nullable) - Array of topic tags
  - `published` (boolean) - Publication status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - Both tables have RLS enabled
  - Public read access for published content (SELECT policies)
  - Authenticated users can manage all content (INSERT, UPDATE, DELETE policies)
  
  ## Notes
  1. Uses `gen_random_uuid()` for automatic ID generation
  2. Timestamps auto-populate with `now()`
  3. RLS ensures public can view but only authenticated admins can modify
  4. `updated_at` automatically updates on row changes via trigger
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  image_url text,
  video_url text,
  tags text[],
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  video_url text,
  tags text[],
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Public can view all projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Blogs policies
CREATE POLICY "Public can view published blogs"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
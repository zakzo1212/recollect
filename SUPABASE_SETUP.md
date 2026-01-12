# Supabase Database Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: recollect (or any name you prefer)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
4. Wait for the project to be created (takes ~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 3: Create Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the values with what you copied from Step 2.

## Step 4: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste the following SQL and click "Run":

```sql
-- Create the ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  done BOOLEAN DEFAULT FALSE,
  done_at TIMESTAMPTZ,
  user_id UUID -- Will be used when we add authentication
);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS ideas_created_at_idx ON ideas(created_at DESC);

-- Enable Row Level Security (will be useful when we add auth)
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (we'll restrict this when we add auth)
CREATE POLICY "Allow all operations for now" ON ideas
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Verify the table was created by going to **Table Editor** → you should see the `ideas` table

## Step 5: Install Dependencies and Test

1. Run `npm install` to install the Supabase client
2. Run `npm run dev` to start your development server
3. Try adding an idea - it should now be saved to Supabase!

## Verification

To verify everything is working:

1. Go to your Supabase dashboard → **Table Editor** → `ideas`
2. Add an idea in your app
3. Refresh the table editor - you should see your idea appear!

## Troubleshooting

- **"Invalid API key"**: Double-check your `.env.local` file has the correct values
- **"relation does not exist"**: Make sure you ran the SQL migration in Step 4
- **CORS errors**: Make sure your Supabase project allows requests from `localhost:3000` (should work by default)

## Next Steps

Once this is working, you can:
- Add authentication (user_id will be automatically set)
- Add Row Level Security policies to restrict access to user's own ideas
- Add indexes for better performance

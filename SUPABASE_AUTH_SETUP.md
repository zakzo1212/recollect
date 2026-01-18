# Supabase Authentication Setup Guide

## Step 1: Enable Google OAuth in Supabase

1. Go to your Supabase dashboard → **Authentication** → **Providers**
2. Find **Google** in the list and click on it
3. Toggle **Enable Google provider**
4. You'll need to create OAuth credentials in Google Cloud Console (see Step 2)
5. Fill in:
   - **Client ID (for OAuth)**: Your Google OAuth Client ID
   - **Client Secret (for OAuth)**: Your Google OAuth Client Secret
6. Click **Save**

## Step 2: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URIs:
     - `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
     - For local development: `http://localhost:3000/auth/callback`
   - Click **Create**
5. Copy the **Client ID** and **Client Secret**
6. Paste them into Supabase (Step 1)

## Step 3: Update Database Schema

Run this SQL in your Supabase SQL Editor to ensure the `user_id` column is properly set up:

```sql
-- Make sure user_id is NOT NULL and has a foreign key constraint
ALTER TABLE ideas 
  ALTER COLUMN user_id SET NOT NULL;

-- Add foreign key constraint (optional but recommended)
ALTER TABLE ideas
  ADD CONSTRAINT ideas_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS ideas_user_id_idx ON ideas(user_id);
```

## Step 4: Set Up Row Level Security (RLS) Policies

Run this SQL to secure your data so users can only see their own ideas:

```sql
-- Drop the old permissive policy if it exists
DROP POLICY IF EXISTS "Allow all operations for now" ON ideas;

-- Policy: Users can only see their own ideas
CREATE POLICY "Users can view own ideas" ON ideas
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only insert their own ideas
CREATE POLICY "Users can insert own ideas" ON ideas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own ideas
CREATE POLICY "Users can update own ideas" ON ideas
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only delete their own ideas
CREATE POLICY "Users can delete own ideas" ON ideas
  FOR DELETE
  USING (auth.uid() = user_id);
```

## Step 5: Update Redirect URL

1. In Supabase dashboard → **Authentication** → **URL Configuration**
2. Add to **Redirect URLs**:
   - `http://localhost:3000/auth/callback` (for local development)
   - `https://yourdomain.com/auth/callback` (for production)
3. Click **Save**

## Step 6: Test Authentication

1. Restart your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Sign in with Google"
4. Complete the Google OAuth flow
5. You should be redirected back and see your email in the header
6. Try creating an idea - it should now be associated with your account!

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure the redirect URI in Google Cloud Console matches exactly: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
- Check that you've added `http://localhost:3000/auth/callback` to Supabase redirect URLs

### "Invalid credentials" error
- Double-check your Google Client ID and Client Secret in Supabase
- Make sure you copied them correctly (no extra spaces)

### Ideas not showing after login
- Check that RLS policies are set up correctly
- Verify that `user_id` is being set when creating ideas (check in Supabase Table Editor)
- Make sure the API routes are correctly filtering by `user_id`

### Session not persisting
- Check browser cookies are enabled
- Clear browser cache and try again
- Check that Supabase client is configured with `persistSession: true` (already done in code)

## Next Steps

Once authentication is working:
- Users can only see their own ideas
- Ideas are automatically associated with the logged-in user
- Data is secured with RLS policies
- Ready to add features like sharing, reminders, etc.

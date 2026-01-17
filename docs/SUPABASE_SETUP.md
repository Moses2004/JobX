# 🚀 Supabase Setup Guide for JobX

This guide will help you set up Supabase backend for your JobX application.

## 📋 Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your JobX project set up locally

---

## 🎯 Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `jobx` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for development
4. Click **"Create new project"**
5. Wait for the project to be created (usually 1-2 minutes)

---

## 🗄️ Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click **"Run"** (or press `Ctrl+Enter`)
6. You should see "Success. No rows returned" message

This will create all the necessary tables:
- `profiles` - User profiles
- `jobs` - Job postings
- `applications` - Job applications
- `posts` - Community posts
- `comments` - Post comments
- `likes` - Post likes
- `messages` - Direct messages
- `connections` - User network connections

---

## 🔑 Step 3: Get API Keys

1. In Supabase dashboard, go to **Settings** → **API** (left sidebar)
2. You'll see two important values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🔐 Step 4: Set Up Environment Variables

1. In your project root, create a `.env` file:
   ```bash
   # .env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Important**: Add `.env` to `.gitignore` to keep your keys secure:
   ```
   .env
   .env.local
   ```

3. Replace the values with your actual Supabase project URL and anon key from Step 3

---

## 📦 Step 5: Install Dependencies

The Supabase client is already installed. Verify it's in your `package.json`:

```bash
npm install
```

You should see `@supabase/supabase-js` in your dependencies.

---

## 🔧 Step 6: Update Authentication

The project now includes:
- `src/lib/supabase.js` - Supabase client configuration
- `src/contexts/AuthContext.jsx` - Authentication context

### Update App.jsx to use Supabase Auth:

1. Wrap your app with `AuthProvider` (already configured)
2. Replace mock auth in `JobXAuth.jsx` with Supabase auth calls

---

## 🌐 Step 7: Configure Authentication Providers

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (already enabled by default)
3. (Optional) Configure other providers like Google, GitHub, etc.

---

## 🔒 Step 8: Set Up Row Level Security (RLS)

RLS is already configured in the schema, but verify:

1. Go to **Authentication** → **Policies**
2. Each table should have policies listed:
   - `profiles` - Users can read/update own profile
   - `jobs` - Anyone can read active jobs, employers manage their own
   - `applications` - Applicants see their own, employers see their job's applications
   - etc.

---

## ✅ Step 9: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try signing up:
   - Go to the signup page
   - Create an account
   - Check your email for verification (if email verification is enabled)

3. Check Supabase Dashboard:
   - Go to **Authentication** → **Users**
   - You should see your new user
   - Go to **Table Editor** → **profiles**
   - You should see the user's profile

---

## 🚢 Step 10: Deploy Frontend (Vercel Recommended)

### Deploy to Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure environment variables:
   - Click **"Environment Variables"**
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **"Deploy"**

### Your site will be live at: `https://your-project.vercel.app`

---

## 📝 Step 11: Update Supabase URLs for Production

1. In Supabase dashboard, go to **Settings** → **API**
2. Scroll down to **"URL Configuration"**
3. Add your Vercel URL to **"Site URL"**: `https://your-project.vercel.app`
4. Add redirect URLs:
   - `https://your-project.vercel.app/auth/callback`
   - `http://localhost:5173/auth/callback` (for local dev)

---

## 🔍 Troubleshooting

### "Failed to fetch" error
- Check that your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Make sure `.env` file is in the root directory
- Restart your dev server after creating `.env`

### "Row Level Security" errors
- Verify RLS policies are set up correctly in the SQL schema
- Check Supabase dashboard → Authentication → Policies

### Email verification not working
- Check Supabase → Authentication → Email Templates
- Verify SMTP settings in Settings → Auth
- For development, you can disable email verification temporarily

### CORS errors
- Supabase handles CORS automatically
- Make sure you're using the correct project URL
- Check that your Supabase project is active

---

## 📚 Next Steps

1. **Integrate Auth in Components**: Update `JobXAuth.jsx` to use Supabase auth
2. **Create API Functions**: Add database queries for jobs, applications, etc.
3. **Add Real-time Features**: Use Supabase Realtime for live updates
4. **Set Up Storage**: Use Supabase Storage for user avatars and resumes
5. **Add Email Templates**: Customize authentication emails

---

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 💡 Tips

- **Free Tier Limits**: Supabase free tier includes 500MB database, 1GB file storage, 2GB bandwidth
- **Database Backups**: Automatic backups are included
- **API Rate Limiting**: Free tier has generous rate limits
- **Local Development**: You can use Supabase locally with Docker for offline development

---

**Need Help?** Check the [Supabase Discord](https://discord.supabase.com) or [GitHub Discussions](https://github.com/supabase/supabase/discussions)

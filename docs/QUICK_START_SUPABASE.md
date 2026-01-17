# ⚡ Quick Start: Supabase Setup for JobX

## 🎯 Get Started in 5 Minutes

### Step 1: Create Supabase Project (2 min)
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **"New Project"**
3. Enter project name: `jobx`
4. Set a database password (save it!)
5. Choose region and click **"Create"**

### Step 2: Get API Keys (1 min)
1. In Supabase dashboard → **Settings** → **API**
2. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Step 3: Set Up Environment Variables (1 min)
1. Create `.env` file in project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
2. Replace with your actual values from Step 2

### Step 4: Create Database Schema (1 min)
1. In Supabase dashboard → **SQL Editor**
2. Click **"New query"**
3. Open `supabase/schema.sql` from this project
4. Copy all SQL code and paste into SQL Editor
5. Click **"Run"**

### Step 5: Start Your App
```bash
npm run dev
```

Open `http://localhost:5173` and test signup/login!

---

## ✅ What's Already Done

- ✅ Supabase client installed (`@supabase/supabase-js`)
- ✅ Supabase configuration (`src/lib/supabase.js`)
- ✅ Auth context (`src/contexts/AuthContext.jsx`)
- ✅ Database schema (`supabase/schema.sql`)
- ✅ All tables and RLS policies configured

---

## 🚀 Next Steps

1. **Integrate Auth**: Update `src/pages/auth/JobXAuth.jsx` to use Supabase
2. **Update App.jsx**: Wrap with `AuthProvider` (see `docs/SUPABASE_SETUP.md`)
3. **Deploy**: Deploy frontend to Vercel (see deployment guide)

---

**Full Guide**: See `docs/SUPABASE_SETUP.md` for detailed instructions

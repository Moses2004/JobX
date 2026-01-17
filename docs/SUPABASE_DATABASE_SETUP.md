# 🗄️ How to Deploy Database Schema to Supabase

Complete step-by-step guide to set up your JobX database on Supabase.

---

## 📋 Prerequisites

- ✅ Supabase account (sign up at [supabase.com](https://supabase.com))
- ✅ Your `supabase/schema.sql` file ready

---

## 🚀 Step-by-Step Guide

### Step 1: Create Supabase Project (5 min)

1. **Go to Supabase Dashboard**
   - Visit [https://app.supabase.com](https://app.supabase.com)
   - Sign in or create a free account

2. **Create New Project**
   - Click **"New Project"** button (top right)
   - Fill in project details:
     ```
     Organization: [Your org or create new]
     Name: jobx
     Database Password: [Create strong password - SAVE THIS!]
     Region: [Choose closest to your users]
     ```
   - Click **"Create new project"**
   - ⏳ Wait 1-2 minutes for project to be created

3. **Project is Ready!**
   - You'll see the project dashboard
   - Note: Your project URL looks like: `https://xxxxx.supabase.co`

---

### Step 2: Open SQL Editor (1 min)

1. **Navigate to SQL Editor**
   - In the left sidebar, click **"SQL Editor"**
   - You'll see a SQL editor interface

2. **Create New Query**
   - Click **"New query"** button (top left)
   - A new SQL editor tab opens

---

### Step 3: Copy Database Schema (2 min)

1. **Open Schema File**
   - In your project, open: `supabase/schema.sql`
   - Select **ALL** the contents (Ctrl+A / Cmd+A)
   - Copy it (Ctrl+C / Cmd+C)

2. **Or View File Location**
   ```
   Your Project/
   └── supabase/
       └── schema.sql  ← This file!
   ```

---

### Step 4: Paste and Run Schema (2 min)

1. **Paste into SQL Editor**
   - Go back to Supabase SQL Editor
   - Paste the entire schema (Ctrl+V / Cmd+V)
   - You should see all the SQL code:
     ```sql
     -- JobX Supabase Database Schema
     CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
     CREATE TABLE IF NOT EXISTS profiles (...)
     CREATE TABLE IF NOT EXISTS jobs (...)
     -- etc.
     ```

2. **Run the Schema**
   - Click **"Run"** button (bottom right)
   - Or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
   - Wait a few seconds...

3. **Check for Success**
   - You should see: **"Success. No rows returned"** ✅
   - If you see errors, see troubleshooting below

---

### Step 5: Verify Tables Were Created (2 min)

1. **Check Table Editor**
   - Click **"Table Editor"** in left sidebar
   - You should see all your tables:
     - ✅ `profiles`
     - ✅ `jobs`
     - ✅ `applications`
     - ✅ `posts`
     - ✅ `comments`
     - ✅ `likes`
     - ✅ `messages`
     - ✅ `connections`

2. **Verify Structure**
   - Click on any table to see its columns
   - Check that columns match your schema

---

### Step 6: Verify Row Level Security (RLS) (1 min)

1. **Check RLS Policies**
   - Go to **"Authentication"** → **"Policies"** (left sidebar)
   - Or click **"Table Editor"** → select a table → **"Policies"** tab
   - You should see policies listed for each table:
     - `profiles` - "Users can view own profile", etc.
     - `jobs` - "Anyone can view active jobs", etc.
     - And more...

2. **RLS is Enabled**
   - All tables should have RLS enabled
   - Policies control who can read/write data

---

## ✅ Verification Checklist

After running the schema, verify:

- [ ] All 8 tables exist in Table Editor
- [ ] RLS policies are visible in Authentication → Policies
- [ ] No errors in SQL Editor output
- [ ] Database password saved securely
- [ ] Project URL noted: `https://xxxxx.supabase.co`

---

## 🔑 Step 7: Get API Keys (1 min)

You'll need these for your frontend:

1. **Go to Settings**
   - Click **"Settings"** (gear icon, bottom left)
   - Click **"API"** in the settings menu

2. **Copy These Values**
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: [Keep secret! Only for server-side]
   ```

3. **Save Them**
   - You'll need these for your `.env` file (next step)

---

## 🔐 Step 8: Set Up Environment Variables

1. **Create `.env` File**
   - In your project root, create `.env`:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   - Replace with your actual values from Step 7

2. **Verify `.env` is in `.gitignore`**
   - Should already be there (we set it up earlier)
   - This keeps your keys safe!

3. **Restart Dev Server**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

---

## 🎯 Quick Reference

### SQL Editor Location
```
Supabase Dashboard → SQL Editor → New Query → Paste schema → Run
```

### Schema File Location
```
Your Project/
└── supabase/
    └── schema.sql
```

### What Gets Created
- 8 database tables
- Row Level Security policies
- Triggers (auto-update timestamps)
- Functions (helper functions)

---

## 🐛 Troubleshooting

### ❌ "relation already exists" Error

**Problem**: Tables already exist  
**Solution**: 
- Option 1: Drop existing tables (if safe to do)
- Option 2: Use `CREATE TABLE IF NOT EXISTS` (already in schema)
- Option 3: Create new Supabase project

### ❌ "permission denied" Error

**Problem**: User doesn't have permission  
**Solution**: 
- Make sure you're using the SQL Editor (not database directly)
- SQL Editor runs with admin privileges automatically

### ❌ "syntax error" Error

**Problem**: SQL syntax issue  
**Solution**:
- Check you copied the entire schema file
- Make sure no extra characters were added
- Verify file encoding is UTF-8

### ❌ Tables Not Showing in Table Editor

**Problem**: Schema didn't run completely  
**Solution**:
- Check SQL Editor output for errors
- Run schema again (safe - uses `IF NOT EXISTS`)
- Refresh Table Editor page

### ❌ RLS Policies Not Working

**Problem**: Policies not created  
**Solution**:
- Check if schema ran completely
- Look for policy creation statements in schema
- Policies should be created automatically

---

## 🔄 Re-running Schema

If you need to update the schema:

1. **Make Changes**
   - Edit `supabase/schema.sql` in your project

2. **Run Updated Schema**
   - Copy updated SQL
   - Paste in SQL Editor
   - Run again

3. **Safe to Re-run**
   - Schema uses `IF NOT EXISTS` - safe to run multiple times
   - Won't duplicate tables or policies

---

## 📊 Database Structure Created

After running the schema, you'll have:

### Tables Created:
1. **profiles** - User profiles (linked to auth.users)
2. **jobs** - Job postings
3. **applications** - Job applications
4. **posts** - Community feed posts
5. **comments** - Post comments
6. **likes** - Post likes
7. **messages** - Direct messages
8. **connections** - User network connections

### Security:
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Policies for read/write access
- ✅ Users can only access their own data

### Features:
- ✅ Auto-updating timestamps (triggers)
- ✅ Like count updates (triggers)
- ✅ Foreign key constraints
- ✅ Unique constraints

---

## ✅ Next Steps

After database is set up:

1. **Update Frontend Environment**
   - Add Supabase URL and keys to `.env`
   - Restart dev server

2. **Test Database Connection**
   - Try signing up a user
   - Check Supabase → Authentication → Users

3. **Verify Data**
   - Check Table Editor to see new data
   - Test queries in SQL Editor

4. **Deploy Frontend**
   - See `docs/DEPLOYMENT_SUPABASE.md`
   - Add env variables to Vercel

---

## 🎉 You're Done!

Your database is now set up on Supabase! 🚀

- ✅ All tables created
- ✅ Security configured
- ✅ Ready for your app to use

**Need Help?**
- [Supabase Docs](https://supabase.com/docs/guides/database)
- [Supabase Discord](https://discord.supabase.com)

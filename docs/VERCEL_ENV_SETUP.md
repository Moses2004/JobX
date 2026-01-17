# 🔐 Setting Up Environment Variables in Vercel

Quick guide to add your Supabase keys to Vercel for deployment.

---

## ⚠️ Important: Don't Push `.env` to GitHub!

- ✅ `.env` is for **local development only**
- ✅ `.env` is in `.gitignore` (won't be committed)
- ✅ Vercel needs its **own** environment variables
- ❌ **Never** commit `.env` to GitHub

---

## 🚀 Step-by-Step: Add Variables to Vercel

### Step 1: Go to Your Vercel Project

1. **Visit Vercel Dashboard**
   - Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with GitHub (if not already)

2. **Select Your Project**
   - Click on your `jobx` project
   - Or create a new project if not deployed yet

### Step 2: Navigate to Environment Variables

1. **Open Project Settings**
   - Click **"Settings"** tab (top navigation)
   - Click **"Environment Variables"** (left sidebar)

### Step 3: Add Supabase Variables

You'll add **2 variables**:

#### Variable 1: Supabase URL

1. **Key**: `VITE_SUPABASE_URL`
2. **Value**: `https://iywfwzzypzapvjgdxizb.supabase.co`
3. **Environments**: Select all:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

#### Variable 2: Supabase Anon Key

1. **Key**: `VITE_SUPABASE_ANON_KEY`
2. **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5d2Z3enp5cHphcHZqZ2R4aXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTg5NjQsImV4cCI6MjA4NDIzNDk2NH0.TGDR7sPO7JeLdnW7G8h8-pppBU4mxefb-Cm6SQjr1Ms`
3. **Environments**: Select all:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Step 4: Save Variables

1. Click **"Save"** after adding each variable
2. Vercel will show: **"Environment Variable Added"**

---

## 📸 Visual Guide

```
Vercel Dashboard
├── Your Project (jobx)
    ├── Settings (tab)
        ├── Environment Variables (sidebar)
            ├── Add New
                ├── Key: VITE_SUPABASE_URL
                ├── Value: https://iywfwzzypzapvjgdxizb.supabase.co
                ├── Environments: [✓] Production [✓] Preview [✓] Development
                └── Save

            ├── Add New
                ├── Key: VITE_SUPABASE_ANON_KEY
                ├── Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                ├── Environments: [✓] Production [✓] Preview [✓] Development
                └── Save
```

---

## 🔄 After Adding Variables

### Option 1: Redeploy (Recommended)

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Your new environment variables will be used

### Option 2: Push New Code

If you push any code changes, Vercel will automatically redeploy with the new variables.

```bash
git add .
git commit -m "Update code"
git push origin main
# Vercel auto-deploys with new env vars!
```

---

## ✅ Verification

After redeploying, check:

1. **Visit your site**: `https://your-project.vercel.app`
2. **Open browser console** (F12)
3. **Check for errors**: Should connect to Supabase
4. **Test signup/login**: Should work with Supabase

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Store `.env` locally (already done)
- ✅ Add variables in Vercel dashboard
- ✅ Use different keys for different environments (optional)
- ✅ Keep `.env` in `.gitignore` (already done)

### ❌ DON'T:
- ❌ Commit `.env` to GitHub
- ❌ Share API keys in public repos
- ❌ Hardcode keys in source code
- ❌ Use service_role key in frontend (use anon key only)

---

## 📋 Checklist

Before deploying:

- [ ] `.env` file exists locally (for dev)
- [ ] `.env` is in `.gitignore` (protected)
- [ ] `VITE_SUPABASE_URL` added to Vercel
- [ ] `VITE_SUPABASE_ANON_KEY` added to Vercel
- [ ] Variables selected for all environments
- [ ] Redeployed after adding variables
- [ ] Tested deployed site

---

## 🆘 Troubleshooting

### Variables Not Working?

1. **Check variable names**: Must be exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. **Redeploy**: Variables are injected at build time - need to redeploy
3. **Check environments**: Make sure variables are enabled for Production/Preview
4. **Check logs**: Vercel → Deployments → View logs

### Still Not Working?

1. **Verify in Vercel**: Settings → Environment Variables → Check values are correct
2. **Build logs**: Check if variables are being read during build
3. **Runtime check**: Your code should log if Supabase is configured

---

## 🎯 Summary

**Local Development:**
- Uses `.env` file (already set up ✅)

**Vercel Deployment:**
- Uses environment variables in Vercel dashboard
- Add them in: Settings → Environment Variables
- Redeploy after adding

**Never commit `.env` to GitHub!** ✅ (Already protected by `.gitignore`)

---

**You're all set!** Add the variables in Vercel and redeploy. 🚀

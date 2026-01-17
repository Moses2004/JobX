# 🚀 Deployment Guide: JobX with Supabase

## Overview

This guide covers deploying your JobX application with Supabase backend. We recommend deploying the frontend to **Vercel** (easiest) and using **Supabase** for backend.

---

## 📋 Prerequisites

- ✅ Supabase project created
- ✅ Database schema set up
- ✅ Environment variables configured locally
- ✅ GitHub account (for Vercel deployment)

---

## 🌐 Step 1: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/jobx.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **"Add New Project"**
   - Select your `jobx` repository
   - Click **"Import"**

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click **"Environment Variables"**
   - Add:
     ```
     VITE_SUPABASE_URL = https://your-project-id.supabase.co
     VITE_SUPABASE_ANON_KEY = your-anon-key-here
     ```
   - Select environments: **Production**, **Preview**, **Development**
   - Click **"Save"**

5. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes
   - Your site is live! 🎉

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🔧 Step 2: Update Supabase Settings

1. **Configure Site URL**
   - Go to Supabase Dashboard → **Settings** → **API**
   - Under **"URL Configuration"**:
     - **Site URL**: `https://your-project.vercel.app`
     - **Redirect URLs**: 
       - `https://your-project.vercel.app/**`
       - `http://localhost:5173/**` (for local dev)

2. **Configure CORS** (if needed)
   - Supabase handles CORS automatically
   - No additional configuration needed

---

## 📝 Step 3: Test Deployment

1. **Visit your live site**: `https://your-project.vercel.app`
2. **Test signup/login**: Create a test account
3. **Check Supabase**:
   - Go to **Authentication** → **Users** (should see your user)
   - Go to **Table Editor** → **profiles** (should see profile)

---

## 🔄 Step 4: Connect Local Development

1. **Keep using `.env` locally**:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Vercel CLI for local preview**:
   ```bash
   vercel dev
   ```
   This uses production environment variables

---

## 📊 Alternative Deployment Options

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import repository
4. Add environment variables in **Site settings** → **Environment variables**
5. Deploy

### Supabase Hosting (Edge Functions)
Supabase primarily hosts backend services. For frontend, use Vercel/Netlify and connect to Supabase API.

### Self-Hosted
If you want to self-host:
1. Build: `npm run build`
2. Serve `dist` folder with nginx/apache
3. Set up environment variables on server
4. Configure domain and SSL

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify `package.json` has all dependencies
- Check that all imports are correct after restructuring

### Environment Variables Not Working
- Make sure variables start with `VITE_`
- Redeploy after adding environment variables
- Check Vercel → Settings → Environment Variables

### Supabase Connection Errors
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check Supabase project is active
- Verify API keys in Supabase dashboard

### CORS Errors
- Supabase handles CORS automatically
- Check Site URL is configured in Supabase settings
- Verify redirect URLs include your Vercel domain

---

## 🔒 Security Best Practices

1. **Never commit `.env` file**:
   - Add to `.gitignore`
   - Use environment variables in Vercel

2. **Use RLS (Row Level Security)**:
   - Already configured in schema
   - Review policies in Supabase dashboard

3. **Anon Key vs Service Role Key**:
   - Use `anon key` in frontend (already done)
   - Never expose `service_role` key

4. **Enable Email Verification**:
   - Supabase → Authentication → Providers → Email
   - Enable "Confirm email"

---

## 📈 Monitoring

### Vercel Analytics
- Enable in Vercel dashboard
- Track page views, performance

### Supabase Dashboard
- Monitor database usage
- Check API request logs
- View authentication logs

---

## 🔄 Updates & CI/CD

Vercel automatically deploys when you push to:
- `main` branch → Production
- Other branches → Preview deployments

Workflow:
```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel auto-deploys!
```

---

## 💰 Cost Estimate

### Free Tier (Perfect for MVP)
- **Vercel**: Free (unlimited deployments)
- **Supabase**: Free (500MB DB, 1GB storage)
- **Total**: $0/month

### Production (After Growth)
- **Vercel Pro**: $20/month (team features)
- **Supabase Pro**: $25/month (8GB DB, 100GB storage)
- **Total**: ~$45/month

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Environment variables set locally
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Site deployed successfully
- [ ] Supabase site URL configured
- [ ] Test signup/login works
- [ ] Database tables visible in Supabase

---

## 🎉 You're Live!

Your JobX app is now deployed and connected to Supabase!

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: Supabase Dashboard
- **Database**: Supabase PostgreSQL

---

**Need Help?**
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Supabase Discord](https://discord.supabase.com)

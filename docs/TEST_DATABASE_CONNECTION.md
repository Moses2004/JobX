# 🧪 How to Test Your Supabase Database Connection

Complete guide to verify your database is working correctly.

---

## ✅ Quick Tests

### Test 1: Check Vercel Deployment (2 min)

1. **Visit Your Deployed Site**
   - Go to your Vercel URL: `https://your-project.vercel.app`
   - Or check Vercel dashboard for your site URL

2. **Open Browser Console**
   - Press `F12` or `Right-click → Inspect`
   - Go to **Console** tab
   - Look for errors

3. **What to Look For:**
   - ✅ No Supabase connection errors
   - ✅ App loads normally
   - ❌ If you see "Failed to fetch" or CORS errors → connection issue

---

### Test 2: Test Authentication (5 min)

**Method 1: Try Sign Up**

1. Go to your deployed site
2. Click "Sign Up" or "Get Started"
3. Fill in the form:
   - Email: `test@example.com`
   - Password: `test123456`
   - Name: `Test User`
4. Click "Sign Up"
5. Check Supabase Dashboard:
   - Go to: https://app.supabase.com/project/iywfwzzypzapvjgdxizb/auth/users
   - You should see your test user! ✅

**Method 2: Check Browser Console**

1. Open browser console (F12)
2. Try signing up
3. Look for:
   - ✅ Success messages
   - ❌ Error messages about Supabase

---

### Test 3: Check Database Tables (3 min)

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com/project/iywfwzzypzapvjgdxizb/editor
   - Click **"Table Editor"** (left sidebar)

2. **Verify Tables Exist**
   - You should see:
     - `profiles`
     - `jobs`
     - `applications`
     - `posts`
     - `comments`
     - `likes`
     - `messages`
     - `connections`

3. **Test Data Insertion**
   - After signing up, check `profiles` table
   - Click on `profiles` table
   - You should see your test user's profile ✅

---

### Test 4: Use Browser DevTools (5 min)

1. **Open DevTools Console**
   - Press `F12`
   - Go to **Console** tab

2. **Test Connection Manually**
   - Paste this in console:
   ```javascript
   // Check if Supabase is loaded
   fetch('https://iywfwzzypzapvjgdxizb.supabase.co/rest/v1/', {
     headers: {
       'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5d2Z3enp5cHphcHZqZ2R4aXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NTg5NjQsImV4cCI6MjA4NDIzNDk2NH0.TGDR7sPO7JeLdnW7G8h8-pppBU4mxefb-Cm6SQjr1Ms'
     }
   })
   .then(r => console.log('✅ Connection OK:', r.status))
   .catch(e => console.error('❌ Connection Failed:', e))
   ```

3. **Expected Result:**
   - ✅ Status: `200` or `401` (both mean connection works)
   - ❌ Error: Connection failed

---

### Test 5: Check Network Tab (3 min)

1. **Open DevTools**
   - Press `F12`
   - Go to **Network** tab

2. **Try Signing Up**
   - Fill signup form and submit

3. **Look for Supabase Requests**
   - Filter by "supabase" or "rest/v1"
   - You should see requests to:
     - `https://iywfwzzypzapvjgdxizb.supabase.co/auth/v1/signup`
     - `https://iywfwzzypvjgdxizb.supabase.co/rest/v1/profiles`

4. **Check Status Codes**
   - ✅ `200` or `201` = Success
   - ❌ `401`, `403`, `500` = Error (check details)

---

## 🔍 Detailed Verification

### Check Environment Variables in Vercel

1. **Go to Vercel Dashboard**
   - Project → Settings → Environment Variables
   - Verify both variables are there:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

2. **Verify Values**
   - URL should be: `https://iywfwzzypzapvjgdxizb.supabase.co`
   - Key should start with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. **Check Environments**
   - Should be enabled for: Production, Preview, Development

---

### Test in Supabase Dashboard

**Test 1: Check Authentication**

1. Go to: https://app.supabase.com/project/iywfwzzypzapvjgdxizb/auth/users
2. Try signing up on your site
3. Check if user appears here within a few seconds ✅

**Test 2: Check Database**

1. Go to: https://app.supabase.com/project/iywfwzzypzapvjgdxizb/editor
2. Click `profiles` table
3. After signup, check if profile row is created ✅

**Test 3: Test SQL Query**

1. Go to SQL Editor
2. Run this query:
   ```sql
   SELECT COUNT(*) FROM profiles;
   ```
3. Should return number of profiles ✅

---

## 🐛 Troubleshooting

### ❌ "Failed to fetch" Error

**Problem**: Can't connect to Supabase

**Solutions**:
1. Check environment variables in Vercel are correct
2. Verify Supabase project is active
3. Check CORS settings in Supabase (should be automatic)
4. Redeploy after adding env variables

### ❌ "Invalid API key" Error

**Problem**: Wrong or missing API key

**Solutions**:
1. Verify `VITE_SUPABASE_ANON_KEY` in Vercel
2. Make sure key starts with `eyJ...`
3. Copy full key (no spaces)
4. Redeploy after fixing

### ❌ User Created But Profile Not Created

**Problem**: Profile creation failed

**Solutions**:
1. Check `profiles` table exists
2. Verify RLS policies allow INSERT
3. Check browser console for errors
4. Check Supabase logs

### ❌ "Relation does not exist" Error

**Problem**: Tables not created

**Solutions**:
1. Go to Supabase SQL Editor
2. Run `supabase/schema.sql` again
3. Check Table Editor - tables should exist

---

## ✅ Success Indicators

You'll know it's working when:

- ✅ Site loads without errors
- ✅ Can sign up successfully
- ✅ User appears in Supabase → Authentication → Users
- ✅ Profile appears in Supabase → Table Editor → profiles
- ✅ No console errors
- ✅ Network requests to Supabase return 200/201

---

## 🎯 Quick Test Checklist

Run through this checklist:

- [ ] Deployed site loads (`https://your-project.vercel.app`)
- [ ] No console errors on page load
- [ ] Can access signup/login page
- [ ] Can create a test account
- [ ] Test user appears in Supabase Auth
- [ ] Test profile appears in Supabase profiles table
- [ ] Network tab shows Supabase requests
- [ ] Requests return success status codes

---

## 📊 Advanced: Test with Code

If you want to add a test button temporarily:

Add this to any page (for testing only):

```javascript
// Test Supabase connection
const testConnection = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('count')
    .limit(1)
  
  if (error) {
    console.error('❌ Connection failed:', error)
    alert('Database connection failed: ' + error.message)
  } else {
    console.log('✅ Connection successful!', data)
    alert('Database connection working!')
  }
}
```

---

## 🎉 Summary

**Quick Test**: 
1. Deploy site → Open it → Try signup → Check Supabase dashboard ✅

**Detailed Test**:
1. Check browser console
2. Check network requests
3. Verify data in Supabase dashboard
4. Test all CRUD operations

**If everything works**: Your database connection is working! 🚀

# 🚀 Deploy Your Portfolio FREE on Vercel — Lifetime Free Guide

This portfolio is engineered to run **100% free, forever** on Vercel + Google AI Studio.
No credit card, no expiry, no sleep delays for the frontend.

---

## ✨ What You Get

- **Frontend** → `shubhamrothe.vercel.app` (Vercel, lifetime free)
- **AI Chatbot** → Vercel Serverless Function calling Gemini (free)
- **Contact form** → opens user's email app (no backend needed)
- **Resume PDF** → served as a static asset

---

## 📋 One-Time Setup (≈10 minutes)

### Step 1 — Get a FREE Gemini API key (no card)

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with any Google account
3. Click **"Create API key"** → **"Create API key in new project"**
4. Copy the key (looks like `AIzaSy...`)

> Google's Gemini free tier is generous: ~1500 requests/day on `gemini-2.0-flash-exp` — way more than any portfolio needs.

---

### Step 2 — Push code to GitHub

Inside Emergent:
1. Click the **"Save to GitHub"** button (top right of the editor)
2. Authorize Emergent → create new repo named `shubhamrothe-portfolio`
3. Done. The repo now has all your code.

---

### Step 3 — Deploy on Vercel

1. Go to https://vercel.com → **Sign up with GitHub** (free, no card)
2. Click **"Add New… → Project"**
3. Pick your `shubhamrothe-portfolio` repo → click **Import**
4. Vercel auto-detects the config from `/vercel.json`. Don't change anything.
5. Expand **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `GEMINI_API_KEY` | *(paste your key from Step 1)* |

6. Click **Deploy**.

After ~90 seconds you'll get a live URL like `https://shubhamrothe-portfolio-xxxx.vercel.app`.

---

### Step 4 — Get the URL you actually want (`shubhamrothe.vercel.app`)

1. Open your project on Vercel
2. Go to **Settings → Domains**
3. Look at the auto-assigned subdomain — click the **⋯ menu → Edit**
4. Rename it to `shubhamrothe` → save.
5. Your site is now live at **`https://shubhamrothe.vercel.app`** 🎉

> If `shubhamrothe` is already taken globally on Vercel, try variants:
> `shubhamrothe-de`, `shubham-rothe`, `shubhamrothe-dev`, `shubhamrothe-data`

---

## 🔄 Updating the Site

Any code change → push to GitHub → Vercel **auto-redeploys** in under 60 seconds.
You don't need to touch Vercel again.

---

## 🧪 Local Preview Before Deploying

You don't need to. Vercel's free preview URLs build a fresh deploy every commit.

---

## ❓ FAQ

**Will I ever be charged?**
No. Vercel's Hobby plan and Google AI Studio's free tier are both lifetime free for personal projects of this size.

**What if I run out of Gemini quota?**
1500/day is more than enough. If hit, the chatbot replies *"I couldn't generate a reply just now"* — site itself stays online.

**Can I add a custom domain like `shubhamrothe.dev`?**
Yes. Buy from Namecheap (~$10/yr — optional). In Vercel → Settings → Domains → Add → follow the DNS instructions.

**What about cold starts?**
- Frontend = static = **instant**, never cold.
- Chatbot serverless function may have a ~1 sec cold start on the first request after long idle. Acceptable.

---

## 🆘 Troubleshooting

**"Chat couldn't reach the model"**
→ Check `GEMINI_API_KEY` in Vercel → Settings → Environment Variables. Redeploy after adding.

**Build fails**
→ Make sure the repo's root has `vercel.json`, `package.json`, `frontend/` folder, and `api/chat.js`.

**Resume PDF doesn't open**
→ The PDF is loaded from the Emergent CDN URL embedded in `frontend/src/lib/portfolio.js`. It's a public URL — works anywhere.

---

## 📞 Need Help?

Email: shubhamrothe144@gmail.com
LinkedIn: https://www.linkedin.com/in/shubham-rothe

— Good luck with the interviews 🎯

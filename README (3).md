# Homepage — Deploy to GitHub Pages

## 1. Before you push
Open `index.html` and replace these placeholders (search for them):
- `your.email@example.com` (appears twice)
- `linkedin.com/in/your-profile`
- `github.com/your-username`
- `[Second manuscript title]` in the Publications section
- Double-check the "AESHA" in the nav bar — add your surname if you'd like the full name shown there and in the `<title>` tag

## 2. Create the repo
1. Go to GitHub → New repository
2. Name it exactly `your-username.github.io` (replace `your-username` with your actual GitHub username) — this makes it your root personal site
3. Keep it public, don't initialize with a README (you already have one)

## 3. Push the file
```bash
git init
git add index.html README.md
git commit -m "Add homepage"
git branch -M main
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

## 4. Turn on Pages
Repo → Settings → Pages → Source → set to `main` branch, `/root` folder → Save.
Your site goes live at `https://your-username.github.io` within a minute or two.

## Notes
- Single self-contained file — no build step, no dependencies to install.
- Fonts load from Google Fonts CDN.
- The hero node-graph automatically disables its animation for visitors with "reduce motion" turned on in their OS settings.

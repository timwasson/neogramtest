# ★ neogramtest ★

> Classic 90s retro website template and widget testing laboratory for **https://neogramtest.neocities.org**.

Built with **Eleventy (11ty)**, styled with **Sass (SCSS)**, and designed as a companion base website to test and validate widgets generated on **[Neogram](https://neogramtest.neocities.org/neogram/)**.

---

## ⚡ Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Credentials
The `.env` file is already pre-configured with the Neocities API key for `neogramtest`. You can verify your connection at any time:
```bash
npm run deploy:check
```

### 3. Local Development
Start the Sass compiler and Eleventy development server with hot-reload:
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

### 4. Build Static Site
Compiles all SCSS to CSS and generates static HTML files in `_site/`:
```bash
npm run build
```

### 5. Deploy to Neocities
Builds the latest assets and deploys directly to `https://neogramtest.neocities.org`:
```bash
npm run deploy
```

---

## 🧪 Testing Neogram Widgets

1. **Preset Widgets**: Go to the **[Widget Lab](/lab/)** on the website to switch between preset widgets (photo feed iframes, AIM chat pagers, and webmaster profile cards).
2. **Custom Embeds**: Paste any custom embed snippet directly into the live textarea and click **"Render in Viewport"** to preview it live in the retro desktop container.
3. **Preset Configuration**: Edit `src/_data/site.json` to add or modify widgets.

---

## 📂 Project Structure

```
neogramtest/
├── .env                     # Neocities API credentials
├── AGENTS.md                # Agent memory & architecture guide
├── eleventy.config.js       # 11ty configuration
├── package.json             # Build and deploy scripts
├── scripts/
│   ├── deploy.js            # Automated Neocities upload script
│   └── verify-key.js        # Neocities API validation
└── src/
    ├── _data/site.json      # Master site data, nav links, sample widgets
    ├── _includes/           # Layouts and reusable 90s UI components
    ├── assets/js/           # Retro effects & widget tester scripts
    ├── scss/                # Modular Sass stylesheets
    ├── index.njk            # Homepage with widget testing lab
    ├── lab.njk              # Dedicated fullscreen widget lab
    ├── about.njk            # Webmaster bio and hardware specs
    └── links.njk            # 90s bookmarks and link exchange
```

---

## 🚀 Deployment Options

- **Local One-Command Deploy** *(Recommended)*:
  ```bash
  npm run deploy
  ```
  This builds the site and sends a multipart upload directly to the Neocities API. You don't even need a Git repository or remote push.
- **Dry-Run Inspection**:
  ```bash
  node scripts/deploy.js --dry-run
  ```
- **GitHub Actions**:
  A workflow is included at `.github/workflows/deploy.yml` that will automatically deploy on pushes to `main` if you ever connect a GitHub repository (add `NEOCITIES_API_KEY` to repository secrets).

---

## 🌐 Live URLs

- **Root Website**: [https://neogramtest.neocities.org](https://neogramtest.neocities.org)
- **Widget Lab**: [https://neogramtest.neocities.org/lab/](https://neogramtest.neocities.org/lab/)
- **Companion Neogram Gallery**: [https://neogramtest.neocities.org/neogram/](https://neogramtest.neocities.org/neogram/)

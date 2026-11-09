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

- **GitHub Pages (Automated)**:
  Every push to the `main` branch automatically triggers `.github/workflows/pages.yml`, which compiles the site with the `/neogramtest/` path prefix and deploys it to the `gh-pages` branch with `keep_files: true` (ensuring any files pushed by Neogram remain untouched).
- **Local One-Command Neocities Deploy**:
  ```bash
  npm run deploy
  ```
  This builds the site and sends a multipart upload directly to the Neocities API.
- **Local GitHub Pages Build**:
  ```bash
  npm run build:gh-pages
  ```
- **Dry-Run Inspection**:
  ```bash
  node scripts/deploy.js --dry-run
  ```
- **Neocities CI/CD**:
  A workflow is included at `.github/workflows/deploy.yml` that automatically deploys to Neocities on pushes to `main` using the `NEOCITIES_API_KEY` secret.

---

## 📸 Connecting to Neogram

To configure this repository as a static publishing target in Neogram:

1. **Provider**: Choose **GitHub Pages (Git Commit REST API)**
2. **Repository**: `timwasson/neogramtest` (or `neogramtest`)
3. **Branch**: `gh-pages`
4. **Deploy Path**: `neogram` (or `/` for root)
5. **Personal Access Token (PAT)**: Provide a GitHub PAT with `repo` scope (classic) or Contents read/write permissions (fine-grained)
6. Click **Test Connection** & **Commit & Push to GitHub Pages**

---

## 🌐 Live URLs

- **GitHub Repository**: [https://github.com/timwasson/neogramtest](https://github.com/timwasson/neogramtest)
- **GitHub Pages**: [https://timwasson.github.io/neogramtest/](https://timwasson.github.io/neogramtest/)
- **Neocities Homepage**: [https://neogramtest.neocities.org](https://neogramtest.neocities.org)
- **Companion Neogram Gallery**: [https://neogramtest.neocities.org/neogram/](https://neogramtest.neocities.org/neogram/)

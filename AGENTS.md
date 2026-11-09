# NeogramTest: Agent Context & System Memory

This file serves as the definitive reference and operating guide for AI agents working on the **neogramtest** project. It documents the project's identity, architecture, deployment mechanisms, and relationship with **Neogram**.

---

## 1. Project Identity & Purpose

- **Live URL**: [https://neogramtest.neocities.org](https://neogramtest.neocities.org)
- **Role**: Official root base website and dedicated widget testing laboratory for **Neogram** ([https://neogramtest.neocities.org/neogram/](https://neogramtest.neocities.org/neogram/)).
- **Aesthetic**: Classic mid-90s personal homepage (Windows 95 / GeoCities inspired: beveled outset/inset boxes, marquee tickers, 88x31 badges, odometer hit counter, webrings, and cosmic starlight background).
- **Core Technology**:
  - **Static Site Generator**: Eleventy (11ty) 3.x using Nunjucks (`.njk`).
  - **Styling**: Sass (`sass`) compiled to vanilla CSS.
  - **Runtime & Deployment**: Plain HTML/CSS/JS deployed via local Node script (`scripts/deploy.js`) or GitHub Actions to Neocities.

---

## 2. Companion Relationship with Neogram

```
┌────────────────────────────────────────────────────────┐
│             https://neogramtest.neocities.org          │
│                                                        │
│  Root Base Website (neogramtest)                       │
│  ├── /                     (90s Personal Homepage)     │
│  ├── /lab/                 (Neogram Widget Lab)        │
│  ├── /about/               (Webmaster Profile & Rig)   │
│  ├── /links/               (Retro Bookmarks & Rings)   │
│  │                                                     │
│  └── /neogram/             (Companion App: Neogram)    │
│      ├── index.html        (Static Photo Stream)       │
│      ├── /photos/          (Individual Snap Pages)     │
│      └── /uploads/         (User Media & Comments)     │
└────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Subpath Preservation Rule**: Neogram deploys its static photo blog into the `/neogram` subdirectory on `neogramtest.neocities.org`. The deployment script (`scripts/deploy.js`) for this project uploads files to the root and **must never delete or overwrite** the `/neogram` remote directory.

---

## 3. Directory Map

```
neogramtest/
├── .env                     # Neocities API credentials (gitignored)
├── .env.example             # Template for API credentials
├── .gitignore               # Ignored build outputs and sensitive files
├── .github/
│   └── workflows/
│       └── deploy.yml       # Automated CI/CD deployment on git push
├── AGENTS.md                # Agent instruction memory (this document)
├── README.md                # Human-friendly documentation
├── eleventy.config.js       # 11ty configuration (passthrough copies, filters)
├── package.json             # NPM scripts and dependencies
├── scripts/
│   ├── deploy.js            # Automated Neocities upload script
│   └── verify-key.js        # Neocities API credential validation
└── src/
    ├── _data/
    │   └── site.json        # Master configuration (title, nav, sample widgets)
    ├── _includes/
    │   ├── components/      # Modular 90s UI components
    │   │   ├── badges.njk   # 88x31 retro badges
    │   │   ├── footer.njk   # Retro footer and metadata
    │   │   ├── header.njk   # Windows 95 titlebar & window chrome
    │   │   ├── marquee.njk  # Animated news ticker
    │   │   ├── navbar.njk   # Beveled tab navigation
    │   │   ├── webring.njk  # Retro webring navigator
    │   │   └── widget-lab.njk # Interactive widget testing workbench
    │   └── layouts/
    │       └── base.njk     # HTML5 shell, CSS links, and scripts
    ├── assets/
    │   └── js/
    │       ├── retro-effects.js # Window buttons, hit counter, audio click
    │       └── widget-tester.js # Live preview switcher and code execution
    ├── scss/
    │   ├── _badges.scss     # 88x31 badge grid styles
    │   ├── _reset.scss      # Reset & cosmic starlight CSS pattern
    │   ├── _retro-components.scss # Window chrome, marquee, hit counter
    │   ├── _variables.scss  # Win95 color palette & 3D border mixins
    │   ├── _widgets.scss    # Widget lab viewport and code editor
    │   └── main.scss        # Aggregated SCSS stylesheet
    ├── index.njk            # Homepage with construction banner & widget lab
    ├── lab.njk              # Fullscreen Widget Testing Laboratory
    ├── about.njk            # Webmaster bio and hardware specs
    └── links.njk            # Retro bookmarks and link exchange
```

---

## 4. Development & Build Commands

All development and publishing tasks can be executed via `npm`:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs Sass watch and Eleventy dev server concurrently at `http://localhost:8080` |
| `npm run build` | Compiles Sass to `src/css/style.css` and generates static site in `_site/` |
| `npm run deploy` | Runs full build and deploys `_site/` directly to Neocities |
| `npm run deploy:only` | Uploads current `_site/` to Neocities without re-running build |
| `npm run deploy:check` | Verifies Neocities API key and prints account info |
| `node scripts/deploy.js --dry-run` | Inspects queued upload files and byte sizes without uploading |

---

## 5. Editing Content & Testing Widgets

### Editing Site Metadata
All primary site content is defined in `src/_data/site.json`. Updating this file automatically updates all pages during build:
- Site title, subtitle, author, and mood.
- Navigation links.
- Sample widgets and preset embed codes.
- Recommended cool sites and bookmarks.

### Adding or Testing a New Widget
1. Open `src/_data/site.json` and add a new entry to `sampleWidgets`:
   ```json
   {
     "id": "my-new-widget",
     "name": "Neogram Mini Banner",
     "description": "Miniature photo banner embed",
     "embedCode": "<iframe src=\"https://neogramtest.neocities.org/neogram/\" width=\"300\" height=\"150\"></iframe>"
   }
   ```
2. Navigate to `http://localhost:8080/lab/` or the live site `/lab/`.
3. Select the new widget button or paste any custom HTML snippet into the embed code textarea and click **Render in Viewport**.
4. Test interactivity, responsiveness, and styles.

---

## 6. Neocities Deployment Mechanics

- **Authentication**: Bearer token authentication against `https://neocities.org/api/upload`.
- **Payload**: Standard multipart/form-data upload via native Node.js `FormData` and `fetch`.
- **Target Site**: `neogramtest` (configured in `.env`).
- **Safety**: Only files inside `_site/` are uploaded to their respective root paths. Files in existing server subdirectories (like `/neogram`) are untouched.

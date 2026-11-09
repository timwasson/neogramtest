#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const siteDir = path.join(projectRoot, '_site');

const apiKey = process.env.NEOCITIES_API_KEY;
const siteName = process.env.NEOCITIES_SITE_NAME || 'neogramtest';
const isDryRun = process.argv.includes('--dry-run');

if (!apiKey) {
  console.error('\x1b[31m[ERROR]\x1b[0m NEOCITIES_API_KEY is not defined in .env.');
  console.error('Please configure .env before deploying.');
  process.exit(1);
}

if (!fs.existsSync(siteDir)) {
  console.error(`\x1b[31m[ERROR]\x1b[0m Build directory "_site" does not exist at ${siteDir}.`);
  console.error('Run "npm run build" first to compile the site.');
  process.exit(1);
}

// Recursively retrieve all files from directory
function getFilesRecursively(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getFilesRecursively(fullPath, baseDir));
    } else {
      if (
        entry.name.startsWith('.') ||
        entry.name === 'Thumbs.db' ||
        entry.name === '.DS_Store'
      ) {
        continue;
      }
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ absolutePath: fullPath, relativePath: relPath });
    }
  }

  return results;
}

async function deploy() {
  console.log('\n==================================================');
  console.log('   ★ NEOCITIES RETRO DEPLOYMENT PIPELINE ★       ');
  console.log('==================================================');
  console.log(` Target Site: https://${siteName}.neocities.org`);
  console.log(` Source Dir:  ${siteDir}`);

  const files = getFilesRecursively(siteDir);

  if (files.length === 0) {
    console.warn('\x1b[33m[WARNING]\x1b[0m No static assets found in _site to upload.');
    process.exit(0);
  }

  let totalBytes = 0;
  console.log(`\n\x1b[36m[QUEUED FILES (${files.length})]:\x1b[0m`);
  for (const f of files) {
    const stat = fs.statSync(f.absolutePath);
    totalBytes += stat.size;
    console.log(`  • /${f.relativePath} (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nTotal payload size: ${(totalBytes / 1024).toFixed(2)} KB`);

  if (isDryRun) {
    console.log('\n\x1b[33m[DRY RUN]\x1b[0m Skipping actual upload to Neocities API.');
    process.exit(0);
  }

  console.log(`\n\x1b[36m[DEPLOYING]\x1b[0m Uploading ${files.length} files to Neocities...`);
  const startTime = Date.now();

  const formData = new FormData();
  for (const file of files) {
    const buffer = fs.readFileSync(file.absolutePath);
    const blob = new Blob([buffer]);
    // The relativePath is the remote filename on Neocities root
    formData.append(file.relativePath, blob, path.basename(file.relativePath));
  }

  try {
    const res = await fetch('https://neocities.org/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok || data.result !== 'success') {
      console.error(`\n\x1b[31m[DEPLOY FAILED]\x1b[0m HTTP ${res.status}: ${data.message || 'Unknown error'}`);
      process.exit(1);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('\n\x1b[32m✔ SUCCESS!\x1b[0m Deployment completed in ' + duration + 's.');
    console.log(`Live URL: \x1b[32mhttps://${siteName}.neocities.org\x1b[0m`);
    console.log('Tested widgets & Neogram companion link: \x1b[32mhttps://' + siteName + '.neocities.org/neogram/\x1b[0m\n');
  } catch (err) {
    console.error('\n\x1b[31m[NETWORK ERROR]\x1b[0m Could not connect to Neocities:', err.message);
    process.exit(1);
  }
}

deploy();

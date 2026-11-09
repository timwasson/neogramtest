#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.NEOCITIES_API_KEY;
const siteName = process.env.NEOCITIES_SITE_NAME || 'neogramtest';

if (!apiKey) {
  console.error('\x1b[31m[ERROR]\x1b[0m NEOCITIES_API_KEY is missing from .env');
  process.exit(1);
}

console.log(`\x1b[36m[NEOCITIES CHECK]\x1b[0m Verifying credentials for site: "${siteName}"...`);

try {
  const res = await fetch('https://neocities.org/api/info', {
    headers: {
      'Authorization': `Bearer ${apiKey.trim()}`
    }
  });

  const data = await res.json();

  if (!res.ok || data.result !== 'success') {
    console.error('\x1b[31m[AUTH REJECTED]\x1b[0m', data.message || `HTTP ${res.status}`);
    process.exit(1);
  }

  console.log('\x1b[32m[SUCCESS]\x1b[0m Connection to Neocities authenticated successfully!');
  console.log('--------------------------------------------------');
  console.log(`  Site Name:     ${data.info.sitename}`);
  console.log(`  Views:         ${data.info.views}`);
  console.log(`  Hits:          ${data.info.hits}`);
  console.log(`  Supporter:     ${data.info.supporter ? 'Yes (Supporter Account)' : 'Free Tier'}`);
  console.log(`  Last Updated:  ${data.info.last_updated}`);
  console.log(`  Live URL:      https://${data.info.sitename}.neocities.org`);
  console.log('--------------------------------------------------');
} catch (err) {
  console.error('\x1b[31m[NETWORK ERROR]\x1b[0m Failed to reach Neocities API:', err.message);
  process.exit(1);
}

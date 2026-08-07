const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'restaurants.json');
const restaurants = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const checkedAt = new Date().toISOString().slice(0, 10);

const decodeEntities = value => String(value || '')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#039;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

const metaPatterns = [
  /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
  /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i,
];

const sourceUrls = item => {
  const links = item.links || {};
  return [
    ['official', links.official],
    ['reservation', links.reservation],
    ['tabelog', links.tabelog],
    ['tabelog', item.ratings?.tabelogUrl],
  ].filter(([, url], index, all) => url && all.findIndex(([, other]) => other === url) === index);
};

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 StarTable image metadata fetcher',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { html: await res.text(), finalUrl: res.url };
  } finally {
    clearTimeout(timer);
  }
}

function extractImage(html, baseUrl) {
  for (const pattern of metaPatterns) {
    const match = html.match(pattern);
    if (!match) continue;
    try {
      const url = new URL(decodeEntities(match[1]), baseUrl).href;
      if (/^https?:\/\//.test(url)) return url;
    } catch {}
  }
  const candidates = [];
  const attrPattern = /\s(?:src|data-src|data-original|data-lazy)=["']([^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi;
  let match;
  while ((match = attrPattern.exec(html))) {
    const raw = decodeEntities(match[1]);
    if (/logo|icon|sprite|blank|loading|placeholder|noimage|no_photo|share-images|ms-pin/i.test(raw)) continue;
    try {
      const url = new URL(raw, baseUrl).href;
      if (/^https?:\/\//.test(url)) candidates.push(url);
    } catch {}
  }
  const preferred = candidates.find(url => /restaurant|rst|photo|shop|main|hero|image|img/i.test(url));
  if (preferred) return preferred;
  if (candidates.length) return candidates[0];
  return '';
}

async function findImage(item) {
  for (const [source, url] of sourceUrls(item)) {
    try {
      const { html, finalUrl } = await fetchText(url);
      const image = extractImage(html, finalUrl || url);
      if (image) return { image, source, url };
    } catch (error) {
      // Try the next source.
    }
  }
  return null;
}

async function main() {
  let updated = 0;
  let scanned = 0;
  const queue = [...restaurants.entries()];
  const workers = Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const [index, item] = queue.shift();
      scanned += 1;
      if (item.heroImage) continue;
      const found = await findImage(item);
      if (!found) {
        console.log(`MISS ${item.nameZh || item.name}`);
        continue;
      }
      restaurants[index].heroImage = found.image;
      restaurants[index].imageSource = found.source;
      restaurants[index].imageSourceUrl = found.url;
      restaurants[index].imageCheckedAt = checkedAt;
      updated += 1;
      console.log(`IMG ${updated}/${scanned} ${item.nameZh || item.name} <- ${found.source}`);
    }
  });
  await Promise.all(workers);
  fs.writeFileSync(dataPath, JSON.stringify(restaurants, null, 2) + '\n');
  console.log(`updated=${updated} total=${restaurants.length}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});

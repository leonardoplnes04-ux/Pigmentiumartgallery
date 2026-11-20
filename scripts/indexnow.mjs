// IndexNow: tells Bing (which feeds ChatGPT search and Copilot), Yandex and
// other IndexNow engines that the site's URLs changed, so they recrawl sooner.
//
// Run AFTER a production deploy:   npm run indexnow
//
// Reads every <loc> of the live sitemap and POSTs them in one request. The key
// file public/<KEY>.txt must be live at https://segundoplanes.com/<KEY>.txt.

const HOST = "segundoplanes.com";
const SITE = `https://${HOST}`;
const KEY = "b258796ccdb00091b51b6cf8339b3a6b";

const sitemap = await fetch(`${SITE}/sitemap.xml`);
if (!sitemap.ok) {
  console.error(`No se pudo leer ${SITE}/sitemap.xml (${sitemap.status})`);
  process.exit(1);
}
const xml = await sitemap.text();
const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
if (urlList.length === 0) {
  console.error("El sitemap no tiene URLs.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200 = recibido; 202 = recibido, la llave se validará después.
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs enviadas.`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}

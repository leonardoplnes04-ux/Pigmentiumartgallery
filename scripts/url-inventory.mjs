// Inventory of every URL in a site's sitemap, to prove that changes never
// alter the Spanish pages and that the English ones are wired correctly.
//
//   node scripts/url-inventory.mjs capture <baseUrl> <out.json>
//   node scripts/url-inventory.mjs compare <before.json> <after.json> [--ignore hreflang,jsonld]
//   node scripts/url-inventory.mjs reciprocity <file.json>
//
// capture:     records status, <html lang>, title, description, canonical,
//              hreflang links, og:locale and a hash of each JSON-LD block for
//              every <loc> in /sitemap.xml.
// compare:     walks the URLs of <before>; exits 1 on any difference not ignored.
//              URLs that only exist in <after> are listed as info.
// reciprocity: every hreflang target must be in the file with status 200 and
//              must link back; exits 1 otherwise.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const [, , command, ...args] = process.argv;

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)=(?:"([^"]*)"|'([^']*)')/g)) out[m[1]] = m[2] ?? m[3];
  return out;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\b[^>]*>`, "g"))].map((m) => attrs(m[0]));
}

function inspect(html) {
  const links = tags(html, "link");
  const metas = tags(html, "meta");
  const jsonld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => {
      let type = "?";
      try {
        const data = JSON.parse(m[1]);
        type = data["@type"] ?? "?";
      } catch {}
      return { type, hash: createHash("sha1").update(m[1]).digest("hex").slice(0, 12) };
    }
  );
  return {
    htmlLang: /<html[^>]*\blang="([^"]*)"/.exec(html)?.[1] ?? null,
    title: /<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? null,
    description: metas.find((m) => m.name === "description")?.content ?? null,
    canonical: links.find((l) => l.rel === "canonical")?.href ?? null,
    hreflang: links
      .filter((l) => l.rel === "alternate" && l.hreflang)
      .map((l) => ({ lang: l.hreflang, href: l.href }))
      .sort((a, b) => a.lang.localeCompare(b.lang)),
    ogLocale: metas.find((m) => m.property === "og:locale")?.content ?? null,
    jsonld,
  };
}

async function capture(base, out) {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const result = {};
  for (const url of urls) {
    // The sitemap carries production URLs; fetch the same path from `base`.
    const path = new URL(url).pathname + new URL(url).search;
    const res = await fetch(base + path, { redirect: "manual" });
    const html = res.status === 200 ? await res.text() : "";
    result[url] = { status: res.status, ...(res.status === 200 ? inspect(html) : {}) };
  }
  writeFileSync(out, JSON.stringify(result, null, 2));
  const bad = Object.entries(result).filter(([, v]) => v.status !== 200);
  console.log(`${urls.length} URLs captured, ${bad.length} not 200`);
  for (const [url, v] of bad) console.log(`  ${v.status} ${url}`);
  if (bad.length) process.exitCode = 1;
}

function compare(aFile, bFile, ignore) {
  const a = JSON.parse(readFileSync(aFile, "utf8"));
  const b = JSON.parse(readFileSync(bFile, "utf8"));
  let diffs = 0;
  for (const url of Object.keys(a)) {
    if (!b[url]) {
      console.log(`MISSING ${url}`);
      diffs++;
      continue;
    }
    for (const key of Object.keys(a[url])) {
      if (ignore.includes(key)) continue;
      const x = JSON.stringify(a[url][key]);
      const y = JSON.stringify(b[url][key]);
      if (x !== y) {
        console.log(`DIFF ${url} [${key}]\n   before: ${x}\n   after:  ${y}`);
        diffs++;
      }
    }
  }
  const added = Object.keys(b).filter((u) => !a[u]);
  console.log(`${Object.keys(a).length} URLs compared, ${diffs} differences, ${added.length} new URLs in after`);
  if (diffs) process.exitCode = 1;
}

function reciprocity(file) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  let problems = 0;
  for (const [url, page] of Object.entries(data)) {
    for (const { lang, href } of page.hreflang ?? []) {
      const target = data[href];
      if (!target || target.status !== 200) {
        console.log(`NO-TARGET ${url} -> [${lang}] ${href}`);
        problems++;
      } else if (!(target.hreflang ?? []).some((l) => l.href === url)) {
        console.log(`NO-BACKLINK ${url} -> [${lang}] ${href}`);
        problems++;
      }
    }
  }
  console.log(`${Object.keys(data).length} URLs checked, ${problems} reciprocity problems`);
  if (problems) process.exitCode = 1;
}

if (command === "capture") await capture(args[0].replace(/\/$/, ""), args[1]);
else if (command === "compare") {
  const i = args.indexOf("--ignore");
  compare(args[0], args[1], i === -1 ? [] : args[i + 1].split(","));
} else if (command === "reciprocity") reciprocity(args[0]);
else {
  console.error("usage: capture <baseUrl> <out> | compare <a> <b> [--ignore k1,k2] | reciprocity <file>");
  process.exitCode = 2;
}

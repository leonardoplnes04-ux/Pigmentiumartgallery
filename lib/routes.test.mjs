import { test } from "node:test";
import assert from "node:assert/strict";
import { toLang, counterpart, languageOfPath, esPathOf } from "./routes.ts";

const MAP = [
  ["/", "/en"],
  ["/obra", "/en/works"],
  ["/obra/obra-07", "/en/works/obra-07"],
  ["/obra/obra-07/simulador", "/en/works/obra-07/simulator"],
  ["/sobre-mi", "/en/about"],
  ["/exposiciones", "/en/exhibitions"],
  ["/exposiciones/exp-11", "/en/exhibitions/exp-11"],
  ["/performance", "/en/performance"],
  ["/performance/per-01", "/en/performance/per-01"],
  ["/videos", "/en/videos"],
  ["/contacto", "/en/contact"],
  ["/prensa", "/en/press"],
  ["/arte-cubano-generacion-80", "/en/cuban-art-1980s-generation"],
  ["/como-adquirir-obra", "/en/how-to-acquire-artwork"],
  ["/privacidad", "/en/privacy"],
];

test("toLang maps every Spanish route to its English URL", () => {
  for (const [es, en] of MAP) assert.equal(toLang(es, "en"), en);
});

test("toLang to es leaves the path untouched", () => {
  for (const [es] of MAP) assert.equal(toLang(es, "es"), es);
});

test("toLang keeps query string and hash", () => {
  assert.equal(toLang("/obra?disponibles=1", "en"), "/en/works?disponibles=1");
  assert.equal(
    toLang("/contacto?obra=A%20B&img=%2Fx.jpg", "en"),
    "/en/contact?obra=A%20B&img=%2Fx.jpg"
  );
  assert.equal(toLang("/sobre-mi#faq", "en"), "/en/about#faq");
});

test("toLang passes unknown segments through", () => {
  assert.equal(toLang("/foo", "en"), "/en/foo");
});

test("counterpart converts in both directions", () => {
  assert.equal(counterpart("/en/works/obra-07", "es"), "/obra/obra-07");
  assert.equal(counterpart("/en", "es"), "/");
  assert.equal(counterpart("/obra", "en"), "/en/works");
  assert.equal(counterpart("/en/about?x=1", "es"), "/sobre-mi?x=1");
  assert.equal(counterpart("/en/about", "en"), "/en/about");
  assert.equal(counterpart("/obra", "es"), "/obra");
});

test("languageOfPath is en only for the exact first segment", () => {
  assert.equal(languageOfPath("/en/about"), "en");
  assert.equal(languageOfPath("/en"), "en");
  assert.equal(languageOfPath("/entrevista"), "es");
  assert.equal(languageOfPath("/"), "es");
});

test("esPathOf round-trips every route", () => {
  for (const [es] of MAP) assert.equal(esPathOf(toLang(es, "en")), es);
});

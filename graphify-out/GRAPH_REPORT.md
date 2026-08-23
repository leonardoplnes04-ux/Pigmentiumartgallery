# Graph Report - DARTGALLERY  (2026-08-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 182 nodes · 355 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fd80d5a4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 33 edges
2. `compilerOptions` - 16 edges
3. `Footer()` - 10 edges
4. `Header()` - 9 edges
5. `artist` - 9 edges
6. `WallSimulator()` - 8 edges
7. `Artwork` - 7 edges
8. `Site` - 5 edges
9. `findRealArtwork()` - 5 edges
10. `Watermark()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ExposicionesPage()` --calls--> `useLanguage()`  [EXTRACTED]
  app/exposiciones/page.tsx → hooks/useLanguage.tsx
- `ObraGrid()` --calls--> `useLanguage()`  [EXTRACTED]
  app/obra/page.tsx → hooks/useLanguage.tsx
- `ArtworkPage()` --calls--> `findRealArtwork()`  [EXTRACTED]
  app/obra/[id]/page.tsx → lib/artworks.ts
- `generateMetadata()` --calls--> `findRealArtwork()`  [EXTRACTED]
  app/obra/[id]/page.tsx → lib/artworks.ts
- `WallSimulator()` --calls--> `useLanguage()`  [EXTRACTED]
  components/WallSimulator.tsx → hooks/useLanguage.tsx

## Import Cycles
- None detected.

## Communities (14 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (14): ArtworkPage(), generateMetadata(), SimuladorPage(), ObraGrid(), ArtworkCard(), Footer(), Header(), artworks (+6 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (14): ExhibitionPage(), generateMetadata(), ExposicionesPage(), ExhibitionDetail(), exhibitionGalleries, exhibitions, galleryArtists, ArtworkStatus (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (17): ArtistStatement(), ArtworkDetail(), ContactBanner(), ExhibitionsPress(), FeaturedCarousel(), ItemLayout, FeaturedWorks(), Hero() (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (17): framer-motion, dependencies, framer-motion, next, react, react-dom, next, name (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (11): fraunces, inter, metadata, ImageGuard(), translations, UiStrings, Language, LocalizedText (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/node, @types/react, @types/react-dom (+7 more)

### Community 8 - "Community 8"
Cohesion: 0.22
Nodes (5): loadImage(), MeasuredArtwork, OverlayRect, WallSimulator(), handleDownload()

## Knowledge Gaps
- **52 isolated node(s):** `MeasuredArtwork`, `OverlayRect`, `ArtworkStatus`, `CriticReview`, `ItemLayout` (+47 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLanguage()` connect `Community 3` to `Community 1`, `Community 2`, `Community 5`, `Community 7`, `Community 8`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `WallSimulator()` connect `Community 8` to `Community 1`, `Community 3`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 6` to `Community 4`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `MeasuredArtwork`, `OverlayRect`, `ArtworkStatus` to the rest of the system?**
  _52 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1402116402116402 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1477832512315271 - nodes in this community are weakly interconnected._
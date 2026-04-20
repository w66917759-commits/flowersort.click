# Flower Sort — Play Online Free

Public static product repository generated from the main `gamesite` Hermes system.

Play Flower Sort now, a free browser merge puzzle that loads in seconds. No download needed — drop tiles, chain merges, and chase the next milestone.

## Play

- Live domain: https://flowersort.click
- Canonical URL: https://flowersort.click/game/flower-sort
- Game route: `/game/flower-sort`
- Render mode: llm
- Source SEO file: [seo.json](./seo.json)

## SEO Blueprint

- SEO title: Play Flower Sort Online Free — No Download Browser Game
- H1: Flower Sort — Play Online Free
- Meta description: Play Flower Sort now, a free browser merge puzzle that loads in seconds. No download needed — drop tiles, chain merges, and chase the next milestone.
- Primary keyword: flower sort
- Category: puzzle
- Mechanic: merge
- Application category: Game
- Operating system: Any (HTML5)

## Keyword Variations

- Play Flower Sort online game free
- Flower Sort unblocked online game
- Flower Sort free game no download

## Internal Link Targets

- puzzle-games
- relaxing-games

## Gameplay Summary

Flower Sort is an HTML5 browser game focused on flower sorting, matching, and clean board management. You can play instantly with no download, then start arranging blossoms by color, type, or tier depending on the embedded version. The core challenge is simple to understand but easy to misplay: every flower you place should prepare the next match. Strong runs keep similar blooms close, leave breathing room, and turn small matches into a tidy garden of higher-value pieces.

## How To Play

- Place or select matching flowers so same-color blooms can combine or clear.
- Build tidy groups instead of spreading flower types across the board.
- Create space before chasing larger blooms; crowded gardens stop chains.

## Tips

- Sort by color first, then think about higher-tier flower upgrades.
- Leave a buffer row or column for awkward incoming pieces.
- Avoid one-off moves that separate a flower from its closest match.

## FAQ

- Do I need to install anything to play Flower Sort? No, the game is a browser-based HTML5 build — just open the page and start playing.
- Does Flower Sort run on mobile browsers? Yes, it runs smoothly on desktop and most modern phones without any plugin.

## Repository Metadata

- Slug: `flower-sort`
- Domain: https://flowersort.click
- GitHub visibility: public by default
- Generated from: main `gamesite` generator repo

## Structure

- `/game/flower-sort/` contains the playable landing page.
- `/seo.json` contains the machine-readable SEO blueprint used to generate this README and page metadata.
- `/privacy`, `/terms`, `/cookies`, and `/disclaimer` are static compliance pages.
- `CNAME`, `robots.txt`, and `sitemap.xml` are ready for static hosting.
- `sw.js` is generated when this domain has an ad service-worker zone configured.
- `vercel.json` forces Vercel to deploy this repository as a static no-framework site.

## Deploy

Recommended main-system flow:

```bash
pnpm project:repo -- --slug flower-sort --init-git --commit --create-github
pnpm project:vercel -- --slug flower-sort
```

Then configure DNS at the registrar:

```txt
@     A     76.76.21.21
www   A     76.76.21.21
```

Remove parking/forwarding records for `@` and `www`. `_domainconnect` TXT can stay.

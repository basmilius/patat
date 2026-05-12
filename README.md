<a href="https://bas.dev" target="_blank" rel="noopener">
	<img src="https://bmcdn.nl/assets/branding/logo.svg" alt="Bas Milius Logo" height="60" width="60" />
</a>

---

# IsHetPatat.nl & IsHetFriet.nl
Source code of the frontend used on [IsHetPatat.nl](https://ishetpatat.nl) and [IsHetFriet.nl](https://ishetfriet.nl).

## Stack
- [Vue 3](https://vuejs.org/) with `<script setup>` and TypeScript
- [Vite](https://vite.dev/) for development and bundling
- [motion-v](https://motion.dev/) for animations
- [Lucide](https://lucide.dev/) for icons
- [Cloudflare Workers](https://workers.cloudflare.com/) with static assets for hosting
- [Bun](https://bun.sh/) as package manager

## Development
```sh
bun install
bun run dev
```

The dev server runs on [http://localhost:8080](http://localhost:8080).

## Production
```sh
bun run build       # type-check + build to dist/
bun run preview     # run the built site through wrangler locally
bun run deploy      # build and deploy to Cloudflare Workers
```

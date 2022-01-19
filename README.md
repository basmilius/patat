<a href="https://bas.dev" target="_blank" rel="noopener">
	<img src="https://bmcdn.nl/assets/branding/logo.svg" alt="Bas Milius Logo" height="60" width="60" />
</a>

---

# IsHetPatat.nl & IsHetFriet.nl
Source code of the frontend used on [IsHetPatat.nl](https://ishetpatat.nl) and [IsHetFriet.nl](https://ishetfriet.nl).

### ✏️ Make changes
To make changes to the website, follow the following steps. It's assumed that you
have basic experience with Node.js and React.
 - Clone the project `git clone https://github.com/basmilius/patat`.
 - Install dependencies with npm, yarn or pnpm `pnpm install`.
 - Run the development version `pnpm run dev`.

### 🚀 Release
A production build should be created when the changes that you've made are ready
for prime time. Follow the following steps to create one. A bunch of optimized
HTML, JS and CSS files are created.
- Stop the development server.
- Run the production builder `pnpm run build`.
- Export the build `pnpm run export`.
- Deploy the resulting files in the `out` folder to your server.

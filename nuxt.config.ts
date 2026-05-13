export default defineNuxtConfig({
    compatibilityDate: "2025-05-01",
    devtools: { enabled: false },
    ssr: true,
    sourcemap: { server: false, client: false },

    css: ["~/assets/styles/main.css"],

    app: {
        head: {
            htmlAttrs: { lang: "nl" },
            link: [
                { rel: "icon", href: "/favicon.ico" },
                { rel: "preconnect", href: "https://font.bmcdn.nl", crossorigin: "" },
                { rel: "preconnect", href: "https://bmcdn.nl", crossorigin: "" },
                { rel: "preload", as: "image", href: "https://bmcdn.nl/assets/joypixels/v7.0/svg/1f35f.svg" },
                { rel: "stylesheet", href: "https://font.bmcdn.nl/css2?family=proxima-soft:wght@400;700" }
            ],
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width,initial-scale=1" },
                { name: "author", content: "Bas Milius" },
                { name: "robots", content: "index,follow" },
                { name: "theme-color", content: "#064663" }
            ]
        }
    },

    nitro: {
        preset: "cloudflare_module",
        cloudflare: {
            deployConfig: true,
            nodeCompat: false,
            wrangler: {
                name: "patat",
                observability: {
                    enabled: true
                },
                kv_namespaces: [
                    {
                        binding: "PATAT_STATS",
                        id: "02c2b2a789774440918cea4d349a494b"
                    }
                ]
            }
        }
    },

    devServer: {
        port: 8080
    },

    vite: {
        server: {
            allowedHosts: ["ishetpatat.nl", "ishetfriet.nl", ".localhost"]
        }
    },

    typescript: {
        strict: true,
        typeCheck: false
    }
});

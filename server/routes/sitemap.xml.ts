const VARIANTS = [
    { host: "ishetpatat.nl", hreflang: "nl-NL" },
    { host: "ishetfriet.nl", hreflang: "nl-BE" }
];

export default defineEventHandler((event) => {
    const url = getRequestURL(event);
    const host = url.hostname;
    const today = new Date().toISOString().split("T")[0];

    const alternates = VARIANTS
        .map(v => `        <xhtml:link rel="alternate" hreflang="${v.hreflang}" href="https://${v.host}/"/>`)
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>https://${host}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
${alternates}
        <xhtml:link rel="alternate" hreflang="x-default" href="https://ishetpatat.nl/"/>
    </url>
</urlset>
`;

    setHeader(event, "Content-Type", "application/xml; charset=utf-8");
    setHeader(event, "Cache-Control", "public, max-age=3600");

    return xml;
});

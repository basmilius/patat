export default defineEventHandler((event) => {
    const url = getRequestURL(event);
    const host = url.hostname;

    setHeader(event, "Content-Type", "text/plain; charset=utf-8");
    setHeader(event, "Cache-Control", "public, max-age=3600");

    return [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: https://${host}/sitemap.xml`,
        ""
    ].join("\n");
});

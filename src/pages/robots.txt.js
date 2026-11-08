export function GET() {
  const site = process.env.SITE_URL;
  const body = site
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap-index.xml", site).toString()}\n`
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

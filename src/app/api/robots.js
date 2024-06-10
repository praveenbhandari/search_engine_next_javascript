
const SITE_URL = "https://www.humanrightsdossier.com";
export default function handler(req, res) {
    const robots = `
      User-agent: *
      Disallow: /private/
      Sitemap: ${SITE_URL}/sitemap.xml
    `;
    res.send(robots);
  }
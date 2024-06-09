const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

// Import your Next.js routes
// const { getAllRoutes } = require('./your-route-file'); // Replace with the file that exports your routes

// const {getAllRoutes} =['/', '/about-us', '/contact-us',"/termsnconditions","/privacypolicy","/pricing","/home"]
async function generateSitemap() {
  // Initialize sitemap stream
  const smStream = new SitemapStream({ hostname: 'https://www.humanrightsdossier.com' });
  const pipeline = smStream.pipe(createGzip());

  // Add static pages to the sitemap
  smStream.write({ url: '/', changefreq: 'daily', priority: 1 });

  // Add dynamic routes
//   const routes = await getAllRoutes(); // Function to get all dynamic routes
const routes=['/', '/about-us', '/contact-us',"/termsnconditions","/privacypolicy","/pricing","/home"]
  routes.forEach(route => {
    smStream.write({ url: route, changefreq: 'daily', priority: 0.7 });
  });

  // End sitemap stream
  smStream.end();

  // Generate sitemap.xml and sitemap.xml.gz files
  const sitemap = await streamToPromise(pipeline);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml.gz'), sitemap);
}

generateSitemap().then(() => console.log('Sitemap generated successfully.'));

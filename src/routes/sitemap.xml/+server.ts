import { posts } from '$lib/posts';

export async function GET() {
	const urls = posts
		.map(
			post => `
			<url>
			<loc>https://xiovcom.vercel.com/blog/${post.category}/${post.slug}</loc>
			<lastmod>${post.date}</lastmod>
			<changefreq>monthly</changefreq>
			<priority>0.6</priority>
		</url>`
		)
		.join('');

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
		<url>
			<loc>https://xiovcom.vercel.com/</loc>
			<lastmod>2025-07-19</lastmod>
			<changefreq>monthly</changefreq>
			<priority>0.9</priority>
		</url>
		<url>
			<loc>https://xiovcom.vercel.com/blog</loc>
			<lastmod>2025-07-19</lastmod>
			<changefreq>weekly</changefreq>
			<priority>1.0</priority>
		</url>
		<url>
			<loc>https://xiovcom.vercel.com/project</loc>
			<lastmod>2025-07-19</lastmod>
			<changefreq>monthly</changefreq>
			<priority>0.7</priority>
		</url>
			${urls}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}

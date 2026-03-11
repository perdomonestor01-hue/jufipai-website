import type { Article } from './types';
import sanitizeHtml from 'sanitize-html';

const API_BASE = 'https://jufipai-linkedin-poster.onrender.com';

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'width', 'height', 'loading'],
  },
  allowedSchemes: ['http', 'https'],
};

function sanitize(html: string): string {
  return sanitizeHtml(html, sanitizeOptions);
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE}/articles`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`Articles API returned ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.warn('Articles API returned non-array');
      return [];
    }

    return data
      .filter((a: any) => a.id && a.title && a.content)
      .map((a: any): Article => ({
        id: String(a.id),
        title: sanitize(a.title),
        content: sanitize(a.content),
        teaser: sanitize(a.teaser || a.content?.slice(0, 200) + '...'),
        category: a.category || 'automation',
        contentType: a.contentType || 'article',
        linkedinUrl: a.linkedinUrl || null,
        createdAt: a.createdAt || new Date().toISOString(),
        readTime: a.readTime || Math.ceil((a.content?.split(/\s+/).length || 0) / 200),
        image: a.image || null,
        imageAttribution: a.imageAttribution || null,
      }))
      .sort((a: Article, b: Article) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    return [];
  }
}

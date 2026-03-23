import type { Article } from './types';
import sanitizeHtml from 'sanitize-html';

const API_BASE = 'https://jufipai-linkedin-poster.onrender.com';

const ALLOWED_LINK_DOMAINS = ['linkedin.com', 'www.linkedin.com'];
const ALLOWED_IMAGE_DOMAINS = ['images.unsplash.com'];

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'blockquote', 'h2', 'h3', 'img'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height', 'loading'],
  },
  allowedSchemes: ['http', 'https'],
};

const stripOptions: sanitizeHtml.IOptions = {
  allowedTags: [],
  allowedAttributes: {},
};

function sanitize(html: string): string {
  return sanitizeHtml(html, sanitizeOptions);
}

function stripHtml(html: string): string {
  return sanitizeHtml(html, stripOptions);
}

function isValidUrl(url: string | null | undefined, allowedDomains: string[]): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return null;
    if (!allowedDomains.some(d => parsed.hostname === d || parsed.hostname.endsWith(`.${d}`))) return null;
    return url;
  } catch {
    return null;
  }
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
        title: stripHtml(a.title),
        content: sanitize(a.content),
        teaser: stripHtml(a.teaser || a.content?.slice(0, 200) + '...'),
        category: a.category || 'automation',
        contentType: a.contentType || 'article',
        linkedinUrl: isValidUrl(a.linkedinUrl, ALLOWED_LINK_DOMAINS),
        createdAt: a.createdAt || new Date().toISOString(),
        readTime: a.readTime || Math.ceil((a.content?.split(/\s+/).length || 0) / 200),
        image: isValidUrl(a.image, ALLOWED_IMAGE_DOMAINS),
        imageAttribution: a.imageAttribution ? stripHtml(a.imageAttribution) : null,
      }))
      .sort((a: Article, b: Article) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    return [];
  }
}

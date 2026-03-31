import type { Article } from './types';
import sanitizeHtml from 'sanitize-html';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

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

function parseArticle(a: any): Article {
  return {
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
  };
}

/**
 * Load articles from local data file (pushed by poster via GitHub API).
 * Falls back to the poster's /articles endpoint if local file missing.
 */
export async function fetchArticles(): Promise<Article[]> {
  // Priority 1: Local data file (persistent in git, pushed by poster)
  try {
    const localPath = resolve('public/data/articles.json');
    if (existsSync(localPath)) {
      const raw = readFileSync(localPath, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        console.log(`[ARTICLES] Loaded ${data.length} from local data file`);
        return data
          .filter((a: any) => a.id && a.title && a.content)
          .map(parseArticle)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
  } catch (err) {
    console.warn('[ARTICLES] Local file read failed, falling back to API:', err);
  }

  // Priority 2: Poster API (fallback for legacy/first-time builds)
  try {
    const res = await fetch(`${API_BASE}/articles`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      console.warn(`[ARTICLES] API returned ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      console.warn('[ARTICLES] API returned non-array');
      return [];
    }

    return data
      .filter((a: any) => a.id && a.title && a.content)
      .map(parseArticle)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    console.error('[ARTICLES] Failed to fetch:', err);
    return [];
  }
}

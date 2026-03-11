export interface Article {
  id: string;
  title: string;
  content: string;
  teaser: string;
  category: string;
  contentType: string;
  linkedinUrl: string | null;
  createdAt: string;
  readTime: number;
  image: string | null;
  imageAttribution: string | null;
}

export type ContentType = 'article' | 'deep_question' | 'unpopular_take' | 'shuffle' | 'creative';

export type Language = 'en' | 'es';

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

export type ContentType = 'article' | 'deep_question' | 'unpopular_take' | 'creative' | 'image_quote' | 'riddle' | 'tip';

export type Language = 'en' | 'es';

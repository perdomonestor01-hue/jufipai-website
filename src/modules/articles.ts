/**
 * ArticleManager - Blog/Article Management System
 */
import { sanitize } from './sanitize';
import { showServicePopup, hideServicePopup } from './popups';
import { showSectionError, clearSectionError } from './error-ui';

interface Article {
    id: string;
    title: string;
    teaser?: string;
    content?: string;
    category: string;
    createdAt: string;
    readTime?: number;
    linkedinUrl?: string;
    hasMedia?: boolean;
    image?: string;
}

export const ArticleManager = {
    articles: [] as Article[],
    currentPage: 1,
    articlesPerPage: 6,
    activeCategory: 'all',
    searchQuery: '',
    apiEndpoint: 'https://jposter-production.up.railway.app', // Production API
    isLoading: false,

    fetchFailed: false,

    async init() {
        console.log('[ArticleManager] Initializing...');
        this.renderSkeletons(); // Show loading state
        await this.fetchArticles();
        this.removeSkeletons(); // Hide loading state

        if (this.fetchFailed && this.articles.length === 0) {
            // Show error state in both featured and grid areas
            this.showArticleError();
        } else {
            this.renderFeaturedArticle();
            this.renderArchiveGrid();
        }

        this.setupFilters();
        this.setupSearch();
        this.setupLoadMore();
        this.startPolling();
        console.log('[ArticleManager] Initialized with', this.articles.length, 'articles');
    },

    showArticleError() {
        // Show error in the featured article area
        const featuredArticle = document.getElementById('featuredArticle');
        if (featuredArticle) {
            featuredArticle.style.display = 'none';
            const errorContainer = document.createElement('div');
            errorContainer.id = 'featuredArticleError';
            errorContainer.className = 'featured-article-error';
            errorContainer.setAttribute('role', 'alert');
            errorContainer.innerHTML = `
                <div class="section-error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <p class="section-error-message">Unable to load the latest articles. Please try again later.</p>
                <button class="section-error-retry" aria-label="Try again">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            `;
            featuredArticle.parentNode?.insertBefore(errorContainer, featuredArticle);

            errorContainer.querySelector('.section-error-retry')?.addEventListener('click', () => {
                errorContainer.remove();
                featuredArticle.style.display = '';
                this.retryFetch();
            });
        }

        // Show error in the grid area
        showSectionError('articlesGrid', 'Unable to load articles.', () => {
            this.retryFetch();
        });
    },

    async retryFetch() {
        this.fetchFailed = false;
        this.renderSkeletons();
        await this.fetchArticles();
        this.removeSkeletons();

        // Remove any previous featured error
        const featuredError = document.getElementById('featuredArticleError');
        if (featuredError) featuredError.remove();
        const featuredArticle = document.getElementById('featuredArticle');
        if (featuredArticle) featuredArticle.style.display = '';

        clearSectionError('articlesGrid');

        if (this.fetchFailed && this.articles.length === 0) {
            this.showArticleError();
        } else {
            this.renderFeaturedArticle();
            this.renderArchiveGrid();
        }
    },

    renderSkeletons() {
        // Show featured article skeleton overlay
        const featuredArticle = document.getElementById('featuredArticle');
        if (featuredArticle) {
            featuredArticle.classList.add('is-loading');

            // Insert a proper structured skeleton before the featured article
            const existingSkeleton = document.getElementById('featuredSkeleton');
            if (!existingSkeleton) {
                const skeletonEl = document.createElement('div');
                skeletonEl.id = 'featuredSkeleton';
                skeletonEl.className = 'skeleton-featured';
                skeletonEl.setAttribute('aria-hidden', 'true');
                skeletonEl.innerHTML = `
                    <div class="skeleton-featured-image"></div>
                    <div class="skeleton-featured-content">
                        <div class="skeleton skeleton-category"></div>
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title-2"></div>
                        <div class="skeleton skeleton-teaser"></div>
                        <div class="skeleton skeleton-teaser-2"></div>
                        <div class="skeleton skeleton-teaser-3"></div>
                        <div class="skeleton-meta">
                            <div class="skeleton skeleton-date"></div>
                            <div class="skeleton skeleton-button"></div>
                        </div>
                    </div>
                `;
                featuredArticle.parentNode?.insertBefore(skeletonEl, featuredArticle);
                featuredArticle.style.display = 'none';
            }
        }

        // Render archive skeletons
        const grid = document.getElementById('articlesGrid');
        if (grid) {
            grid.innerHTML = Array(3).fill('').map(() => `
                <div class="skeleton-article-card" aria-hidden="true">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton skeleton-category"></div>
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title-2"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text-short"></div>
                        <div class="skeleton-footer">
                            <div class="skeleton skeleton-date"></div>
                            <div class="skeleton skeleton-time"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    },

    removeSkeletons() {
        // Remove featured skeleton
        const featuredSkeleton = document.getElementById('featuredSkeleton');
        if (featuredSkeleton) {
            featuredSkeleton.remove();
        }

        const featuredArticle = document.getElementById('featuredArticle');
        if (featuredArticle) {
            featuredArticle.classList.remove('is-loading');
            featuredArticle.style.display = '';
        }
    },

    async fetchArticles() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.fetchFailed = false;

        try {
            // Try static data first (embedded at build time by GitHub Actions)
            let response = await fetch('/data/articles.json');

            if (response.ok) {
                const staticArticles = await response.json();
                if (staticArticles.length > 0) {
                    this.articles = staticArticles;
                    console.log('[ArticleManager] Loaded from static data:', staticArticles.length, 'articles');
                } else {
                    console.log('[ArticleManager] Static data empty, trying live API...');
                    response = await fetch(`${this.apiEndpoint}/articles`);
                    if (response.ok) {
                        this.articles = await response.json();
                        console.log('[ArticleManager] Loaded from live API');
                    } else {
                        console.warn('[ArticleManager] API returned error, using defaults');
                        this.fetchFailed = true;
                        this.articles = this.getDefaultArticles();
                    }
                }
            } else {
                console.log('[ArticleManager] No static data, trying live API...');
                response = await fetch(`${this.apiEndpoint}/articles`);
                if (response.ok) {
                    this.articles = await response.json();
                    console.log('[ArticleManager] Loaded from live API');
                } else {
                    console.warn('[ArticleManager] API not available, using defaults');
                    this.fetchFailed = true;
                    this.articles = this.getDefaultArticles();
                }
            }
        } catch (error: any) {
            console.warn('[ArticleManager] Fetch error, using defaults:', error.message);
            this.fetchFailed = true;
            this.articles = this.getDefaultArticles();
        }

        this.isLoading = false;
    },

    getDefaultArticles(): Article[] {
        return [
            {
                id: 'default-1',
                title: 'How We Automated 40 Hours of Weekly Work for a Real Estate Agency',
                teaser: 'Client inquiries, property scheduling, and follow-ups - all on autopilot using Google Workspace and AI agents. Here\'s the exact system we built.',
                content: `Friday afternoon. Got a call from a real estate agency owner who was spending 40+ hours a week on admin work.

The problem wasn't complicated. Every new lead meant:
\u2022 Manual entry into their CRM
\u2022 Scheduling showings via back-and-forth emails
\u2022 Follow-up reminders in three different apps
\u2022 Property info lookup from multiple sources
\u2022 Commission calculations in a spreadsheet nightmare

We built something different.

THE SOLUTION

First, we connected their contact form directly to Google Sheets. Not revolutionary, but here's the twist - we added an AI layer that reads each inquiry and automatically:

1. Categorizes the lead (buyer, seller, renter)
2. Matches them with available properties based on their criteria
3. Sends a personalized response with relevant listings
4. Creates calendar slots for showings

The scheduling part was the game-changer. Instead of 15 emails to book one showing, prospects get a Calendly-style link that syncs with agent availability, property access times, AND travel time between showings.

THE RESULTS

Week one: 12 hours saved on scheduling alone.
Month one: Lead response time dropped from 4 hours to 4 minutes.
Month three: 40% increase in showing-to-offer conversion.

The owner told me something that stuck: "I became a real estate agent to help people find homes, not to fight with spreadsheets."

That's what automation should do. Not replace the human parts - amplify them.

Want to see if this works for your business? The diagnosis is free.`,
                category: 'automation',
                createdAt: new Date().toISOString(),
                readTime: 3,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
            },
            {
                id: 'default-2',
                title: 'The Time Clock That Stopped Lying: GPS-Verified Attendance',
                teaser: 'A staffing company was losing $3,000/month to buddy punching. GPS verification fixed it overnight - but not in the way you\'d expect.',
                content: `Tuesday morning. The staffing company owner shows me his time records.

"See this? John clocked in at 6:58 AM. Perfect, right?"

I waited.

"John's car was in the shop. His friend Mike clocked him in. John actually showed up at 8:30."

This was happening 15-20 times per week across 200 employees. Quick math: $3,000+ per month in paid-but-not-worked hours.

THE OBVIOUS SOLUTION (THAT DIDN'T WORK)

Their first instinct was surveillance. Biometric scanners, photo verification, manager approval for every punch.

The employees hated it. Turnover spiked. The ones who stayed resented the Big Brother treatment.

THE ACTUAL SOLUTION

We built a simple mobile clock-in that uses GPS - but with a twist. Instead of tracking employees constantly (creepy), it only verifies location at the moment of clock-in.

Here's what made it work:

1. TRUST BY DEFAULT - Employees clock in normally via app
2. GEOFENCE CHECK - Quick location ping at punch time (within 500ft of job site)
3. EXCEPTIONS ONLY - Only flags punches that fail the check
4. HUMAN REVIEW - Flagged punches go to a supervisor, not auto-denied

The psychology matters. We're not assuming everyone's a thief. We're catching the actual problems.

THE UNEXPECTED RESULT

Buddy punching dropped to near zero within two weeks. But here's what surprised everyone:

Employee satisfaction went UP.

Why? The honest employees were tired of watching others game the system. Fair enforcement meant fair treatment.

The $3,000/month leak? Plugged. The trust problem? Solved differently than expected.

Sometimes the best automation isn't about removing humans - it's about removing the temptation to be less than honest.`,
                category: 'productivity',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                readTime: 3,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80'
            },
            {
                id: 'default-3',
                title: 'Why Most AI Agents Fail in Production (And How to Build Ones That Don\'t)',
                teaser: 'After 50+ deployments, here\'s the pattern: AI agents fail not because of the model, but because of missing guardrails.',
                content: `Let me tell you about the AI agent that almost cost a client $50,000.

It was a content generation agent. Simple job: write social media posts based on company news. We used Claude, gave it good prompts, tested it thoroughly.

First week in production, it invented a product launch that didn't exist. Posted it to LinkedIn. Customer service got flooded with questions about a product they'd never heard of.

THE REAL PROBLEM

The AI didn't malfunction. It did exactly what we asked - be creative and engaging. We just didn't tell it what NOT to do.

After 50+ agent deployments, here's what I've learned:

GUARDRAIL #1: VALIDATION LAYERS

Every AI output needs validation before it reaches the real world:
\u2022 Schema validation (is the format correct?)
\u2022 Content validation (are all claims verifiable?)
\u2022 Safety validation (does it contain anything problematic?)

We now run 3 separate checks on every AI response. Paranoid? Maybe. But we haven't had an incident since.

GUARDRAIL #2: HUMAN-IN-THE-LOOP (FOR NOW)

Full automation is the goal, but earned trust takes time.

Start with: AI suggests \u2192 Human approves \u2192 Action taken
Move to: AI acts \u2192 Human reviews \u2192 Feedback loop
End with: AI acts \u2192 Spot checks \u2192 Continuous monitoring

Skipping stages is how you get invented product launches.

GUARDRAIL #3: FAIL GRACEFULLY

What happens when the AI doesn't know? Most agents either:
\u2022 Hallucinate confidently (bad)
\u2022 Crash entirely (also bad)

Good agents say "I'm not sure about this - flagging for human review."

We build explicit uncertainty detection into every agent. If confidence drops below 80%, it asks for help instead of guessing.

THE PATTERN THAT WORKS

1. Define success criteria BEFORE building
2. Add validation at every output point
3. Start with human oversight, reduce gradually
4. Build in graceful failure modes
5. Monitor constantly, improve continuously

AI agents that work in production aren't smarter. They're more honest about their limitations.

The best agent is one that knows when to ask for help.`,
                category: 'ai',
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                readTime: 4,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
            },
            {
                id: 'default-4',
                title: 'The 47-Tab Spreadsheet Monster We Killed with One Dashboard',
                teaser: 'A construction company had 47 interconnected spreadsheet tabs. We replaced them all with a single real-time dashboard.',
                content: `"Don't touch anything. If you break a formula, we're dead."

That's how the office manager introduced me to their spreadsheet system. 47 tabs. 12,000+ formulas. Three people whose only job was keeping it updated.

This is not an exaggeration. This is Tuesday in most small businesses.

THE ARCHAEOLOGY

We spent two days just mapping what the spreadsheet actually did:
\u2022 Tab 1-15: Project tracking
\u2022 Tab 16-23: Employee hours
\u2022 Tab 24-31: Material costs
\u2022 Tab 32-40: Client invoicing
\u2022 Tab 41-47: "Don't ask, just don't touch"

The last section? Legacy formulas from 2018 that nobody understood anymore but everyone was afraid to delete.

THE MIGRATION

We didn't try to replicate the spreadsheet. We asked: "What decisions does this data support?"

Turns out, despite 47 tabs, they really needed to answer 5 questions:
1. Which projects are profitable?
2. Which are over budget?
3. Who's working where?
4. What materials do we need?
5. Who owes us money?

We built a dashboard that answers those 5 questions. In real-time. With data that updates automatically from their existing tools.

THE RESULT

The 47-tab monster? Archived. Not deleted (they weren't ready for that), but no longer the source of truth.

Time spent on data entry: Down 80%
Time to answer "how's project X doing?": From 20 minutes to 20 seconds
Formula anxiety: Gone

The office manager sent me a message three weeks later: "I slept through the night for the first time in two years."

Sometimes the best technology project isn't adding something new. It's removing something old that's been quietly torturing everyone.`,
                category: 'automation',
                createdAt: new Date(Date.now() - 259200000).toISOString(),
                readTime: 3,
                linkedinUrl: 'https://www.linkedin.com/company/jufipai',
                hasMedia: true,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
            }
        ];
    },

    renderFeaturedArticle() {
        const featured = this.articles[0];
        if (!featured) return;

        const titleEl = document.getElementById('featuredTitle');
        const teaserEl = document.getElementById('featuredTeaser');
        const categoryEl = document.getElementById('featuredCategory');
        const dateEl = document.getElementById('featuredDate');
        const linkedInLink = document.getElementById('featuredLinkedIn') as HTMLAnchorElement;
        const newBadge = document.getElementById('newBadge');
        const readMoreBtn = document.getElementById('featuredReadMore');
        const featuredImage = document.getElementById('featuredImage') as HTMLImageElement;

        if (titleEl) titleEl.textContent = featured.title;
        if (teaserEl) teaserEl.textContent = featured.teaser || featured.content?.substring(0, 200) + '...';
        if (categoryEl) categoryEl.textContent = this.formatCategory(featured.category);
        if (dateEl) dateEl.textContent = this.formatDate(featured.createdAt);

        // Show featured image if available
        if (featuredImage && featured.image) {
            featuredImage.src = featured.image;
            featuredImage.alt = featured.title;
            featuredImage.style.display = 'block';
        }

        // Show LinkedIn link if available
        if (linkedInLink && featured.linkedinUrl) {
            linkedInLink.href = featured.linkedinUrl;
            linkedInLink.style.display = 'inline-flex';
            linkedInLink.onclick = function(e: MouseEvent) {
                e.stopPropagation();
                window.open(featured.linkedinUrl!, '_blank', 'noopener,noreferrer');
                return false;
            };
        }

        // Show NEW badge if article is from last 24 hours
        const isNew = (Date.now() - new Date(featured.createdAt).getTime()) < 86400000;
        if (newBadge) {
            newBadge.style.display = isNew ? 'block' : 'none';
        }

        // Read more button opens popup with full content
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', () => {
                this.showArticlePopup(featured);
            });
        }

        // Setup social sharing for featured article
        this.setupSocialSharing(featured);
    },

    setupSocialSharing(article: Article) {
        const shareContainer = document.getElementById('featuredShare');
        if (!shareContainer) return;

        const shareBtns = shareContainer.querySelectorAll('.share-btn');
        const pageUrl = encodeURIComponent(window.location.href + '#blog');
        const shareText = encodeURIComponent(article.title + ' - JufipAI');

        shareBtns.forEach(btn => {
            btn.addEventListener('click', (e: Event) => {
                e.stopPropagation();
                const platform = (btn as HTMLElement).dataset.platform;

                let shareUrl: string | undefined;
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(window.location.href + '#blog').then(() => {
                            btn.classList.add('copied');
                            const icon = btn.querySelector('i');
                            if (icon) {
                                const originalClass = icon.className;
                                icon.className = 'fas fa-check';
                                setTimeout(() => {
                                    btn.classList.remove('copied');
                                    icon.className = originalClass;
                                }, 2000);
                            }
                        });
                        return;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
                }
            });
        });
    },

    renderArchiveGrid() {
        const grid = document.getElementById('articlesGrid');
        if (!grid) return;

        // Get articles excluding the featured one
        let archiveArticles = this.articles.slice(1);

        // Apply category filter
        if (this.activeCategory !== 'all') {
            archiveArticles = archiveArticles.filter(a => a.category === this.activeCategory);
        }

        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            archiveArticles = archiveArticles.filter(a =>
                a.title.toLowerCase().includes(query) ||
                (a.teaser && a.teaser.toLowerCase().includes(query)) ||
                (a.content && a.content.toLowerCase().includes(query))
            );
        }

        // Get articles for current page
        const toShow = archiveArticles.slice(0, this.currentPage * this.articlesPerPage);

        if (toShow.length === 0) {
            grid.innerHTML = `
                <div class="no-articles" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #94a3b8;">
                    <i class="fas fa-newspaper" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No articles found in this category yet.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = toShow.map(article => {
            const safeImage = sanitize.url(article.image || '');
            const safeTitle = sanitize.text(article.title || '');
            const safeTeaser = sanitize.text(article.teaser || article.content?.substring(0, 100) + '...' || '');
            const safeId = sanitize.attr(article.id || '');
            return `
            <article class="article-card ${safeImage ? 'has-image' : ''}" data-id="${safeId}" tabindex="0" role="listitem">
                <div class="article-card-image">
                    ${safeImage ? `<img src="${safeImage}" alt="${safeTitle}" loading="lazy">` : ''}
                </div>
                <div class="article-card-content">
                    <div class="article-category">${this.formatCategory(article.category)}</div>
                    <h4>${safeTitle}</h4>
                    <p>${safeTeaser}</p>
                    <div class="article-card-footer">
                        <span>${this.formatDate(article.createdAt)}</span>
                        <span><i class="fas fa-clock"></i> ${article.readTime || 3} min</span>
                    </div>
                </div>
            </article>`;
        }).join('');

        // Add click handlers
        grid.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = (card as HTMLElement).dataset.id;
                const article = this.articles.find(a => a.id === id);
                if (article) this.showArticlePopup(article);
            });

            // Keyboard support
            card.addEventListener('keydown', (e: Event) => {
                const keyEvent = e as KeyboardEvent;
                if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                    keyEvent.preventDefault();
                    (card as HTMLElement).click();
                }
            });
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreArticles');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = toShow.length < archiveArticles.length ? 'flex' : 'none';
        }
    },

    showArticlePopup(article: Article) {
        const pageUrl = encodeURIComponent(window.location.href + '#blog');
        const shareText = encodeURIComponent(article.title + ' - JufipAI');
        const safeLinkedinUrl = sanitize.url(article.linkedinUrl || '');
        const sanitizedParagraphs = (article.content || '').split('\n')
            .map(p => p.trim() ? `<p>${sanitize.html(p)}</p>` : '')
            .join('');

        const formattedContent = `
            <div class="article-popup-content">
                <div class="reading-progress-container">
                    <div class="reading-progress-bar" id="readingProgressBar"></div>
                </div>
                <div class="article-popup-meta">
                    <span class="article-category">${this.formatCategory(article.category)}</span>
                    <span class="article-date">${this.formatDate(article.createdAt)}</span>
                    <span class="article-readtime"><i class="fas fa-clock"></i> ${article.readTime || 3} min read</span>
                </div>
                <div class="article-popup-body">
                    ${sanitizedParagraphs}
                </div>
                ${safeLinkedinUrl ? `
                    <a href="${sanitize.attr(safeLinkedinUrl)}" target="_blank" rel="noopener noreferrer" class="linkedin-link" style="margin-top: 1.5rem;" onclick="event.stopPropagation(); window.open('${sanitize.attr(safeLinkedinUrl)}', '_blank', 'noopener,noreferrer'); return false;">
                        <i class="fab fa-linkedin"></i> View on LinkedIn
                    </a>
                ` : ''}
                <div class="social-share" style="margin-top: 1.5rem;">
                    <span class="share-label">Share:</span>
                    <button class="share-btn" onclick="event.stopPropagation(); window.open('https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}', '_blank', 'width=600,height=400');" aria-label="Share on X/Twitter">
                        <i class="fab fa-x-twitter"></i>
                    </button>
                    <button class="share-btn" onclick="event.stopPropagation(); window.open('https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}', '_blank', 'width=600,height=400');" aria-label="Share on LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </button>
                    <button class="share-btn" onclick="event.stopPropagation(); window.open('https://www.facebook.com/sharer/sharer.php?u=${pageUrl}', '_blank', 'width=600,height=400');" aria-label="Share on Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    <button class="share-btn" onclick="event.stopPropagation(); navigator.clipboard.writeText(decodeURIComponent('${pageUrl}')); this.classList.add('copied'); this.querySelector('i').className='fas fa-check'; setTimeout(() => { this.classList.remove('copied'); this.querySelector('i').className='fas fa-link'; }, 2000);" aria-label="Copy link">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
                ${this.getRelatedArticlesHTML(article)}
            </div>
        `;

        // Create a temporary card element for positioning
        const blogSection = document.getElementById('blog');
        showServicePopup(article.title, formattedContent, 'fas fa-newspaper', blogSection || undefined);

        // Setup reading progress tracking and related articles after popup renders
        setTimeout(() => {
            this.setupReadingProgress();
            this.setupRelatedArticleClicks();
        }, 100);
    },

    setupRelatedArticleClicks() {
        const relatedCards = document.querySelectorAll('.related-card');
        relatedCards.forEach(card => {
            const clickHandler = (e: Event) => {
                e.stopPropagation();
                const articleId = (card as HTMLElement).dataset.articleId;
                const article = this.articles.find(a => a.id === articleId);
                if (article) {
                    // Close current popup and open new one
                    hideServicePopup();
                    setTimeout(() => {
                        this.showArticlePopup(article);
                    }, 300);
                }
            };

            card.addEventListener('click', clickHandler);
            card.addEventListener('keydown', (e: Event) => {
                const keyEvent = e as KeyboardEvent;
                if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                    keyEvent.preventDefault();
                    clickHandler(e);
                }
            });
        });
    },

    setupReadingProgress() {
        const popupContent = document.querySelector('.popup-content-wrapper');
        const progressBar = document.getElementById('readingProgressBar');

        if (!popupContent || !progressBar) return;

        const updateProgress = () => {
            const scrollTop = popupContent.scrollTop;
            const scrollHeight = popupContent.scrollHeight - popupContent.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

            progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (progress >= 95) {
                progressBar.classList.add('complete');
            } else {
                progressBar.classList.remove('complete');
            }
        };

        popupContent.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial check
    },

    getRelatedArticlesHTML(currentArticle: Article): string {
        // Get articles in the same category, excluding current
        let related = this.articles.filter(a =>
            a.id !== currentArticle.id &&
            a.category === currentArticle.category
        ).slice(0, 2);

        // If not enough in same category, add from other categories
        if (related.length < 2) {
            const others = this.articles.filter(a =>
                a.id !== currentArticle.id &&
                !related.find(r => r.id === a.id)
            ).slice(0, 2 - related.length);
            related = [...related, ...others];
        }

        if (related.length === 0) return '';

        return `
            <div class="related-articles">
                <h4 class="related-title">
                    <i class="fas fa-book-open"></i>
                    Keep Reading
                </h4>
                <div class="related-grid">
                    ${related.map(article => `
                        <div class="related-card" data-article-id="${sanitize.attr(article.id || '')}" tabindex="0">
                            <span class="related-category">${this.formatCategory(article.category)}</span>
                            <h5>${sanitize.text(article.title || '')}</h5>
                            <span class="related-time"><i class="fas fa-clock"></i> ${article.readTime || 3} min</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Filter articles
                this.activeCategory = (btn as HTMLElement).dataset.category || 'all';
                this.currentPage = 1;
                this.renderArchiveGrid();
            });
        });
    },

    setupSearch() {
        const searchInput = document.getElementById('articleSearchInput') as HTMLInputElement;
        const searchClear = document.getElementById('searchClear');

        if (!searchInput) return;

        // Debounce search input
        let searchTimeout: ReturnType<typeof setTimeout>;
        searchInput.addEventListener('input', (e: Event) => {
            clearTimeout(searchTimeout);
            const value = (e.target as HTMLInputElement).value.trim();

            // Show/hide clear button
            if (searchClear) {
                searchClear.style.display = value ? 'flex' : 'none';
            }

            searchTimeout = setTimeout(() => {
                this.searchQuery = value;
                this.currentPage = 1;
                this.renderArchiveGrid();
            }, 300); // 300ms debounce
        });

        // Clear search
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.style.display = 'none';
                this.searchQuery = '';
                this.currentPage = 1;
                this.renderArchiveGrid();
                searchInput.focus();
            });
        }

        // Search on Enter key
        searchInput.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                this.searchQuery = '';
                this.currentPage = 1;
                this.renderArchiveGrid();
                searchInput.blur();
            }
        });
    },

    setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreArticles');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderArchiveGrid();
            });
        }
    },

    startPolling() {
        // Check for new articles every 5 minutes
        setInterval(async () => {
            const oldCount = this.articles.length;
            const oldLatestId = this.articles[0]?.id;

            await this.fetchArticles();

            // Check if there's a new article
            if (this.articles.length > oldCount || this.articles[0]?.id !== oldLatestId) {
                console.log('[ArticleManager] New article detected!');
                this.renderFeaturedArticle();
                this.renderArchiveGrid();

                // Trigger notification if NotificationManager is available
                if (typeof (window as any)._NotificationManager !== 'undefined') {
                    (window as any)._NotificationManager.showNewArticleNotification(this.articles[0]);
                }
            }
        }, 300000); // 5 minutes
    },

    formatDate(dateStr: string): string {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    },

    formatCategory(category: string): string {
        const categoryMap: Record<string, string> = {
            'automation': 'Automation',
            'ai': 'AI Tools',
            'productivity': 'Productivity'
        };
        return categoryMap[category] || category || 'Insights';
    }
};

/**
 * JufipAI Performance Testing Script
 * Run this in the browser console to test performance
 */

(function() {
    'use strict';

    class PerformanceTester {
        constructor() {
            this.results = {};
            this.startTime = performance.now();
            console.log('🚀 Starting JufipAI Performance Test...');
        }

        // Test 1: Page Load Metrics
        async testPageLoad() {
            console.log('📊 Testing page load performance...');

            const navigation = performance.getEntriesByType('navigation')[0];
            const paintEntries = performance.getEntriesByType('paint');
            const resourceEntries = performance.getEntriesByType('resource');

            this.results.pageLoad = {
                domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.navigationStart : 0,
                loadComplete: navigation ? navigation.loadEventEnd - navigation.navigationStart : 0,
                firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
                firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
                resourceCount: resourceEntries.length,
                totalResourceSize: resourceEntries.reduce((total, resource) => total + (resource.transferSize || 0), 0)
            };

            console.log('✅ Page Load Results:', this.results.pageLoad);
            return this.results.pageLoad;
        }

        // Test 2: Animation Performance
        async testAnimationPerformance() {
            console.log('🎬 Testing animation performance...');

            return new Promise((resolve) => {
                let frameCount = 0;
                let startTime = performance.now();
                let frameRates = [];
                let memoryUsage = [];

                const measureFrames = () => {
                    frameCount++;
                    const currentTime = performance.now();
                    const elapsed = currentTime - startTime;

                    // Capture memory usage if available
                    if (performance.memory) {
                        memoryUsage.push({
                            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                            timestamp: currentTime
                        });
                    }

                    if (elapsed >= 1000) { // Every second
                        const fps = Math.round((frameCount / elapsed) * 1000);
                        frameRates.push(fps);
                        frameCount = 0;
                        startTime = currentTime;

                        if (frameRates.length >= 5) { // Test for 5 seconds
                            const avgFPS = frameRates.reduce((a, b) => a + b, 0) / frameRates.length;
                            const minFPS = Math.min(...frameRates);
                            const maxFPS = Math.max(...frameRates);

                            this.results.animation = {
                                averageFPS: avgFPS,
                                minFPS,
                                maxFPS,
                                frameRates,
                                memoryUsage,
                                animationCount: this.countAnimations()
                            };

                            console.log('✅ Animation Results:', this.results.animation);
                            resolve(this.results.animation);
                        } else {
                            requestAnimationFrame(measureFrames);
                        }
                    } else {
                        requestAnimationFrame(measureFrames);
                    }
                };

                requestAnimationFrame(measureFrames);
            });
        }

        // Test 3: CSS Performance
        testCSSPerformance() {
            console.log('🎨 Testing CSS performance...');

            const stylesheets = Array.from(document.styleSheets);
            let totalRules = 0;
            let complexSelectors = 0;
            let animations = 0;

            stylesheets.forEach(sheet => {
                try {
                    if (sheet.cssRules) {
                        totalRules += sheet.cssRules.length;
                        Array.from(sheet.cssRules).forEach(rule => {
                            if (rule.selectorText) {
                                // Count complex selectors (3+ parts)
                                if (rule.selectorText.split(/\s+|>|~|\+/).length > 3) {
                                    complexSelectors++;
                                }
                            }
                            if (rule.type === CSSRule.KEYFRAMES_RULE) {
                                animations++;
                            }
                        });
                    }
                } catch (e) {
                    // Skip cross-origin stylesheets
                }
            });

            this.results.css = {
                totalStylesheets: stylesheets.length,
                totalRules,
                complexSelectors,
                animations,
                estimatedSize: this.estimateFileSize('css')
            };

            console.log('✅ CSS Results:', this.results.css);
            return this.results.css;
        }

        // Test 4: JavaScript Performance
        testJavaScriptPerformance() {
            console.log('⚡ Testing JavaScript performance...');

            const scripts = Array.from(document.querySelectorAll('script[src]'));
            const resourceEntries = performance.getEntriesByType('resource');

            let totalJSSize = 0;
            scripts.forEach(script => {
                const resource = resourceEntries.find(r => r.name.includes(script.src));
                if (resource) {
                    totalJSSize += resource.transferSize || 0;
                }
            });

            // Test DOM manipulation performance
            const domTestStart = performance.now();
            const testDiv = document.createElement('div');
            for (let i = 0; i < 1000; i++) {
                testDiv.innerHTML = `<span>Test ${i}</span>`;
            }
            const domTestTime = performance.now() - domTestStart;

            this.results.javascript = {
                scriptCount: scripts.length,
                totalSize: totalJSSize,
                domManipulationTime: domTestTime,
                memoryUsage: performance.memory ? {
                    used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                    total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                    limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
                } : null
            };

            console.log('✅ JavaScript Results:', this.results.javascript);
            return this.results.javascript;
        }

        // Test 5: Mobile Performance Simulation
        testMobilePerformance() {
            console.log('📱 Testing mobile performance...');

            // Simulate mobile viewport
            const originalWidth = window.innerWidth;
            const originalHeight = window.innerHeight;

            // Test touch events
            const touchSupport = 'ontouchstart' in window;
            const devicePixelRatio = window.devicePixelRatio || 1;

            // Test network information
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

            this.results.mobile = {
                touchSupport,
                devicePixelRatio,
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                isMobile: window.innerWidth <= 768,
                connection: connection ? {
                    effectiveType: connection.effectiveType,
                    downlink: connection.downlink,
                    rtt: connection.rtt
                } : null,
                deviceMemory: navigator.deviceMemory || 'unknown',
                hardwareConcurrency: navigator.hardwareConcurrency || 'unknown'
            };

            console.log('✅ Mobile Results:', this.results.mobile);
            return this.results.mobile;
        }

        // Test 6: Accessibility Performance
        testAccessibility() {
            console.log('♿ Testing accessibility performance...');

            const focusableElements = document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

            const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const ariaLabels = document.querySelectorAll('[aria-label], [aria-labelledby]');

            // Test color contrast (simplified)
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
            let contrastIssues = 0;

            textElements.forEach(element => {
                const styles = window.getComputedStyle(element);
                const color = styles.color;
                const backgroundColor = styles.backgroundColor;

                // Very basic contrast check
                if (color === backgroundColor) {
                    contrastIssues++;
                }
            });

            this.results.accessibility = {
                focusableElements: focusableElements.length,
                imagesWithoutAlt: imagesWithoutAlt.length,
                headingCount: headings.length,
                ariaLabels: ariaLabels.length,
                potentialContrastIssues: contrastIssues,
                keyboardNavigable: this.testKeyboardNavigation()
            };

            console.log('✅ Accessibility Results:', this.results.accessibility);
            return this.results.accessibility;
        }

        // Test 7: Core Web Vitals
        async testCoreWebVitals() {
            console.log('📈 Testing Core Web Vitals...');

            return new Promise((resolve) => {
                const vitals = {
                    lcp: null,
                    fid: null,
                    cls: 0
                };

                // LCP Observer
                if ('PerformanceObserver' in window) {
                    try {
                        const lcpObserver = new PerformanceObserver((entryList) => {
                            const entries = entryList.getEntries();
                            const lastEntry = entries[entries.length - 1];
                            vitals.lcp = lastEntry.startTime;
                            lcpObserver.disconnect();
                        });
                        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                    } catch (e) {
                        console.warn('LCP measurement not supported');
                    }

                    // CLS Observer
                    try {
                        const clsObserver = new PerformanceObserver((entryList) => {
                            for (const entry of entryList.getEntries()) {
                                if (!entry.hadRecentInput) {
                                    vitals.cls += entry.value;
                                }
                            }
                        });
                        clsObserver.observe({ entryTypes: ['layout-shift'] });
                    } catch (e) {
                        console.warn('CLS measurement not supported');
                    }
                }

                // FID simulation (measure first click response time)
                let fidMeasured = false;
                const measureFID = (event) => {
                    if (!fidMeasured) {
                        const fid = performance.now() - event.timeStamp;
                        vitals.fid = fid;
                        fidMeasured = true;
                        document.removeEventListener('click', measureFID);
                    }
                };
                document.addEventListener('click', measureFID);

                // Resolve after 3 seconds to allow measurements
                setTimeout(() => {
                    this.results.coreWebVitals = vitals;
                    console.log('✅ Core Web Vitals Results:', this.results.coreWebVitals);
                    resolve(this.results.coreWebVitals);
                }, 3000);
            });
        }

        // Helper Functions
        countAnimations() {
            const animatedElements = document.querySelectorAll(
                '[style*="animation"], .particle, .ai-agent, .robot, .article-card, .featured-article'
            );
            return animatedElements.length;
        }

        estimateFileSize(type) {
            const elements = type === 'css'
                ? document.querySelectorAll('link[rel="stylesheet"]')
                : document.querySelectorAll('script[src]');

            const resourceEntries = performance.getEntriesByType('resource');
            let totalSize = 0;

            elements.forEach(element => {
                const href = element.href || element.src;
                const resource = resourceEntries.find(r => r.name === href);
                if (resource) {
                    totalSize += resource.transferSize || 0;
                }
            });

            return Math.round(totalSize / 1024); // KB
        }

        testKeyboardNavigation() {
            const focusableElements = document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

            let properTabOrder = true;
            let previousTabIndex = -1;

            focusableElements.forEach(element => {
                const tabIndex = parseInt(element.tabIndex) || 0;
                if (tabIndex > 0 && tabIndex < previousTabIndex) {
                    properTabOrder = false;
                }
                previousTabIndex = tabIndex;
            });

            return {
                totalFocusable: focusableElements.length,
                properTabOrder
            };
        }

        // Generate Performance Score
        calculatePerformanceScore() {
            let score = 100;

            // Page Load Score (30 points)
            if (this.results.pageLoad) {
                if (this.results.pageLoad.loadComplete > 5000) score -= 15;
                else if (this.results.pageLoad.loadComplete > 3000) score -= 10;
                else if (this.results.pageLoad.loadComplete > 1500) score -= 5;

                if (this.results.pageLoad.firstContentfulPaint > 2500) score -= 10;
                else if (this.results.pageLoad.firstContentfulPaint > 1500) score -= 5;

                if (this.results.pageLoad.totalResourceSize > 2 * 1024 * 1024) score -= 5; // 2MB
            }

            // Animation Score (25 points)
            if (this.results.animation) {
                if (this.results.animation.averageFPS < 30) score -= 15;
                else if (this.results.animation.averageFPS < 45) score -= 10;
                else if (this.results.animation.averageFPS < 55) score -= 5;

                if (this.results.animation.memoryUsage?.length > 0) {
                    const maxMemory = Math.max(...this.results.animation.memoryUsage.map(m => m.used));
                    if (maxMemory > 100) score -= 10;
                    else if (maxMemory > 50) score -= 5;
                }
            }

            // Core Web Vitals Score (25 points)
            if (this.results.coreWebVitals) {
                if (this.results.coreWebVitals.lcp > 4000) score -= 10;
                else if (this.results.coreWebVitals.lcp > 2500) score -= 5;

                if (this.results.coreWebVitals.cls > 0.25) score -= 10;
                else if (this.results.coreWebVitals.cls > 0.1) score -= 5;

                if (this.results.coreWebVitals.fid > 300) score -= 5;
                else if (this.results.coreWebVitals.fid > 100) score -= 2;
            }

            // Accessibility Score (10 points)
            if (this.results.accessibility) {
                if (this.results.accessibility.imagesWithoutAlt > 0) score -= 5;
                if (this.results.accessibility.potentialContrastIssues > 5) score -= 3;
                if (!this.results.accessibility.keyboardNavigable.properTabOrder) score -= 2;
            }

            // Mobile Score (10 points)
            if (this.results.mobile) {
                if (!this.results.mobile.touchSupport && this.results.mobile.isMobile) score -= 5;
                if (this.results.mobile.deviceMemory < 2) score -= 3;
                if (this.results.mobile.connection?.effectiveType === 'slow-2g') score -= 2;
            }

            return Math.max(0, Math.round(score));
        }

        // Generate Recommendations
        generateRecommendations() {
            const recommendations = [];

            // Page Load Recommendations
            if (this.results.pageLoad?.loadComplete > 3000) {
                recommendations.push({
                    priority: 'high',
                    category: 'Page Load',
                    issue: 'Slow page load time',
                    solution: 'Optimize images, minify CSS/JS, implement lazy loading',
                    metric: `${this.results.pageLoad.loadComplete.toFixed(0)}ms`
                });
            }

            if (this.results.pageLoad?.totalResourceSize > 1024 * 1024) {
                recommendations.push({
                    priority: 'medium',
                    category: 'Resource Size',
                    issue: 'Large total resource size',
                    solution: 'Use WebP images, implement code splitting, enable compression',
                    metric: `${(this.results.pageLoad.totalResourceSize / 1024 / 1024).toFixed(1)}MB`
                });
            }

            // Animation Recommendations
            if (this.results.animation?.averageFPS < 45) {
                recommendations.push({
                    priority: 'high',
                    category: 'Animation Performance',
                    issue: 'Low frame rate detected',
                    solution: 'Use CSS transforms, reduce animation complexity, implement will-change',
                    metric: `${this.results.animation.averageFPS.toFixed(1)} FPS`
                });
            }

            // Memory Recommendations
            if (this.results.animation?.memoryUsage?.length > 0) {
                const maxMemory = Math.max(...this.results.animation.memoryUsage.map(m => m.used));
                if (maxMemory > 50) {
                    recommendations.push({
                        priority: 'medium',
                        category: 'Memory Usage',
                        issue: 'High memory consumption',
                        solution: 'Implement object pooling, optimize particle systems, clean up unused DOM',
                        metric: `${maxMemory}MB`
                    });
                }
            }

            // Core Web Vitals Recommendations
            if (this.results.coreWebVitals?.lcp > 2500) {
                recommendations.push({
                    priority: 'high',
                    category: 'Core Web Vitals',
                    issue: 'Poor Largest Contentful Paint',
                    solution: 'Optimize hero image, improve server response time, preload critical resources',
                    metric: `LCP: ${this.results.coreWebVitals.lcp.toFixed(0)}ms`
                });
            }

            if (this.results.coreWebVitals?.cls > 0.1) {
                recommendations.push({
                    priority: 'medium',
                    category: 'Core Web Vitals',
                    issue: 'High Cumulative Layout Shift',
                    solution: 'Set image dimensions, avoid inserting content above fold, use CSS containment',
                    metric: `CLS: ${this.results.coreWebVitals.cls.toFixed(3)}`
                });
            }

            // Accessibility Recommendations
            if (this.results.accessibility?.imagesWithoutAlt > 0) {
                recommendations.push({
                    priority: 'high',
                    category: 'Accessibility',
                    issue: 'Images without alt text',
                    solution: 'Add descriptive alt attributes to all images',
                    metric: `${this.results.accessibility.imagesWithoutAlt} images`
                });
            }

            return recommendations;
        }

        // Generate Report
        generateReport() {
            const score = this.calculatePerformanceScore();
            const recommendations = this.generateRecommendations();
            const totalTime = (performance.now() - this.startTime) / 1000;

            const report = {
                score,
                grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F',
                testDuration: totalTime.toFixed(2),
                results: this.results,
                recommendations,
                timestamp: new Date().toISOString()
            };

            console.log('📋 Performance Report Generated:');
            console.log(`🎯 Overall Score: ${score}/100 (Grade: ${report.grade})`);
            console.log(`⏱️ Test Duration: ${totalTime.toFixed(2)}s`);

            if (recommendations.length > 0) {
                console.log('🔧 Recommendations:');
                recommendations.forEach((rec, index) => {
                    console.log(`${index + 1}. [${rec.priority.toUpperCase()}] ${rec.category}: ${rec.issue}`);
                    console.log(`   Solution: ${rec.solution}`);
                    console.log(`   Metric: ${rec.metric}`);
                });
            } else {
                console.log('✅ No critical issues found!');
            }

            return report;
        }

        // Run All Tests
        async runAllTests() {
            console.log('🚀 Running comprehensive performance analysis...');

            try {
                await this.testPageLoad();
                await this.testAnimationPerformance();
                this.testCSSPerformance();
                this.testJavaScriptPerformance();
                this.testMobilePerformance();
                this.testAccessibility();
                await this.testCoreWebVitals();

                return this.generateReport();
            } catch (error) {
                console.error('❌ Performance test failed:', error);
                return { error: error.message };
            }
        }
    }

    // Auto-run if script is executed directly
    if (typeof window !== 'undefined') {
        window.JufipAIPerformanceTester = PerformanceTester;

        // Make it easy to run
        window.runPerformanceTest = async function() {
            const tester = new PerformanceTester();
            return await tester.runAllTests();
        };

        console.log('🎯 JufipAI Performance Tester loaded!');
        console.log('💡 Run: runPerformanceTest() to start testing');
    }

})();
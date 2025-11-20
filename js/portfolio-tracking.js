/**
 * Comprehensive GA4 Event Tracking for Portfolio Page
 * Tracks user interactions, scroll behavior, engagement, and more
 */

(function() {
  'use strict';

  // Helper function to safely send events to GA4
  function trackEvent(eventName, eventParams) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, eventParams);
      console.log('GA4 Event:', eventName, eventParams);
    }
  }

  // Track page engagement time
  let engagementStartTime = Date.now();
  let isPageVisible = true;

  // Track when user leaves/returns to page
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      isPageVisible = false;
      const timeOnPage = Math.round((Date.now() - engagementStartTime) / 1000);
      trackEvent('page_hide', {
        time_on_page_seconds: timeOnPage
      });
    } else {
      isPageVisible = true;
      engagementStartTime = Date.now();
      trackEvent('page_show', {});
    }
  });

  // Track total engagement time on page unload
  window.addEventListener('beforeunload', function() {
    const totalEngagement = Math.round((Date.now() - engagementStartTime) / 1000);
    trackEvent('page_engagement', {
      engagement_time_seconds: totalEngagement
    });
  });

  // Scroll depth tracking
  let maxScrollDepth = 0;
  let scrollMilestones = [10, 25, 50, 75, 90, 100];
  let trackedMilestones = new Set();

  function trackScrollDepth() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;

      scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          trackEvent('scroll_depth', {
            percent: milestone
          });
        }
      });
    }
  }

  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(trackScrollDepth, 100);
  });

  // Track all external link clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const linkText = link.textContent.trim();
    const isExternal = link.hostname && link.hostname !== window.location.hostname;
    const opensInNewTab = link.target === '_blank';

    if (href && href !== '#') {
      // Categorize the link
      let linkCategory = 'internal';
      let linkType = 'standard';

      if (isExternal) {
        linkCategory = 'external';
      }

      // Identify specific link types
      if (href.includes('web.archive.org')) {
        linkType = 'wayback_machine';
      } else if (href.includes('developers.google.com')) {
        linkType = 'developer_docs';
      } else if (href.includes('support.google.com')) {
        linkType = 'help_center';
      } else if (href.includes('cloud.google.com')) {
        linkType = 'cloud_docs';
      } else if (href.includes('youtube.com') || href.includes('youtu.be')) {
        linkType = 'video';
      } else if (href.includes('github.com')) {
        linkType = 'github';
      } else if (href.includes('amazon.com') || href.includes('peachpit.com')) {
        linkType = 'book_purchase';
      }

      // Check if link is in a sunset notice
      const inSunsetNotice = link.closest('.sunset-notice') !== null;

      trackEvent('link_click', {
        link_url: href,
        link_text: linkText.substring(0, 100), // Limit to 100 chars
        link_category: linkCategory,
        link_type: linkType,
        is_sunset_link: inSunsetNotice,
        opens_new_tab: opensInNewTab
      });
    }
  });

  // Track book cover image clicks
  document.querySelectorAll('.book-item a').forEach(function(bookLink) {
    bookLink.addEventListener('click', function(e) {
      const bookTitle = this.querySelector('img')?.alt || 'Unknown Book';
      trackEvent('book_click', {
        book_title: bookTitle
      });
    });
  });

  // Track sunset notice interactions (viewing)
  const sunsetNotices = document.querySelectorAll('.sunset-notice');
  const observedSunsets = new Set();

  if (sunsetNotices.length > 0 && 'IntersectionObserver' in window) {
    const sunsetObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !observedSunsets.has(entry.target)) {
          observedSunsets.add(entry.target);
          const productName = entry.target.textContent.includes('Universal Analytics')
            ? 'Universal Analytics'
            : 'Google Optimize';
          trackEvent('sunset_notice_view', {
            product: productName
          });
        }
      });
    }, { threshold: 0.5 });

    sunsetNotices.forEach(function(notice) {
      sunsetObserver.observe(notice);
    });
  }

  // Track section visibility
  const sections = document.querySelectorAll('.portfolio-section, .featured-project, .portfolio-bio, .books-section');
  const viewedSections = new Set();

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !viewedSections.has(entry.target)) {
          viewedSections.add(entry.target);
          const sectionName = entry.target.querySelector('h2, h3')?.textContent || 'Unknown Section';
          trackEvent('section_view', {
            section_name: sectionName
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  // Track navigation clicks
  document.querySelectorAll('nav a, .nav-items a').forEach(function(navLink) {
    navLink.addEventListener('click', function(e) {
      const navText = this.textContent.trim();
      const navHref = this.getAttribute('href');
      trackEvent('navigation_click', {
        nav_item: navText || 'Home',
        nav_url: navHref
      });
    });
  });

  // Track featured project interactions
  const featuredProject = document.querySelector('.featured-project');
  if (featuredProject) {
    featuredProject.querySelectorAll('a').forEach(function(projectLink) {
      projectLink.addEventListener('click', function(e) {
        const linkText = this.textContent.trim();
        trackEvent('featured_project_click', {
          link_text: linkText.substring(0, 100),
          link_url: this.href
        });
      });
    });

    // Track screenshot clicks
    featuredProject.querySelectorAll('.screenshot-item a').forEach(function(screenshotLink, index) {
      screenshotLink.addEventListener('click', function(e) {
        const caption = this.querySelector('.screenshot-caption')?.textContent || 'Screenshot ' + (index + 1);
        trackEvent('screenshot_click', {
          screenshot_name: caption,
          screenshot_url: this.href
        });
      });
    });
  }

  // Track bio section reading (if user spends time on it)
  const bioSection = document.querySelector('.portfolio-bio');
  if (bioSection && 'IntersectionObserver' in window) {
    let bioStartTime = null;
    const bioObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !bioStartTime) {
          bioStartTime = Date.now();
        } else if (!entry.isIntersecting && bioStartTime) {
          const readTime = Math.round((Date.now() - bioStartTime) / 1000);
          if (readTime >= 3) { // Only track if spent at least 3 seconds
            trackEvent('bio_read', {
              read_time_seconds: readTime
            });
          }
          bioStartTime = null;
        }
      });
    }, { threshold: 0.5 });

    bioObserver.observe(bioSection);
  }

  // Track video link clicks (YouTube)
  document.querySelectorAll('a[href*="youtube.com"], a[href*="youtu.be"]').forEach(function(videoLink) {
    videoLink.addEventListener('click', function(e) {
      const videoTitle = this.textContent.trim();
      trackEvent('video_click', {
        video_title: videoTitle.substring(0, 100),
        video_url: this.href
      });
    });
  });

  // Track footer link clicks
  document.querySelectorAll('footer a').forEach(function(footerLink) {
    footerLink.addEventListener('click', function(e) {
      const linkText = this.textContent.trim();
      trackEvent('footer_click', {
        footer_link: linkText,
        footer_url: this.href
      });
    });
  });

  // Track copy/paste events (user copying content)
  document.addEventListener('copy', function(e) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      trackEvent('content_copy', {
        copied_text_length: selectedText.length,
        copied_text_preview: selectedText.substring(0, 50)
      });
    }
  });

  // Track right-click context menu (might indicate sharing/saving)
  document.addEventListener('contextmenu', function(e) {
    const element = e.target;
    let elementType = element.tagName.toLowerCase();

    if (element.closest('img')) {
      elementType = 'image';
    } else if (element.closest('a')) {
      elementType = 'link';
    }

    trackEvent('context_menu', {
      element_type: elementType
    });
  });

  // Track page print events
  window.addEventListener('beforeprint', function() {
    trackEvent('page_print', {
      action: 'initiated'
    });
  });

  window.addEventListener('afterprint', function() {
    trackEvent('page_print', {
      action: 'completed'
    });
  });

  // Track browser back/forward navigation
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      trackEvent('page_cache_restore', {
        navigation_type: 'back_forward_cache'
      });
    }
  });

  // Initial page view tracking with metadata
  trackEvent('portfolio_page_view', {
    page_title: document.title,
    page_location: window.location.href,
    referrer: document.referrer || 'direct',
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight
  });

  // Track device orientation changes (mobile/tablet users)
  if ('orientation' in window) {
    window.addEventListener('orientationchange', function() {
      trackEvent('orientation_change', {
        orientation: window.orientation === 0 ? 'portrait' : 'landscape'
      });
    });
  }

  // Track rage clicks (clicking same element multiple times rapidly)
  let clickCounts = new Map();
  document.addEventListener('click', function(e) {
    const element = e.target.closest('a, button, .book-item, .screenshot-item');
    if (element) {
      const elementId = element.id || element.className || element.tagName;
      const now = Date.now();

      if (!clickCounts.has(elementId)) {
        clickCounts.set(elementId, { count: 1, lastClick: now });
      } else {
        const data = clickCounts.get(elementId);
        if (now - data.lastClick < 1000) { // Within 1 second
          data.count++;
          if (data.count >= 3) {
            trackEvent('rage_click', {
              element_type: element.tagName.toLowerCase(),
              element_class: element.className,
              click_count: data.count
            });
          }
        } else {
          data.count = 1;
        }
        data.lastClick = now;
      }
    }
  });

  console.log('Portfolio GA4 tracking initialized');
})();

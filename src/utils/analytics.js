/**
 * Utility functions for sending events to Google Tag Manager, Meta Pixel, and TikTok Pixel.
 */

// Track a custom event globally
export const trackEvent = (eventName, params = {}) => {
  // 1. Google Tag Manager
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // 2. Meta Pixel (Facebook)
  if (typeof window !== 'undefined' && window.fbq) {
    // If you pass specific standard FB events, we handle them usually via specific preset. 
    // Otherwise it defaults to trackCustom
    window.fbq('trackCustom', eventName, params);
  }

  // 3. TikTok Pixel
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track(eventName, params);
  }
};

// Preset for standardized 'Donate Click' event (InitiateCheckout eqv)
export const trackDonateClick = (source = 'Homepage') => {
  const params = { content_category: 'Donation', source, currency: 'IDR' };
  
  // Custom global firing
  trackEvent('InitiateDonation', params);

  // Firing explicit standard events for ads conversion optimization
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', params);
  }
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('InitiateCheckout', params);
  }
};

// Preset for standardized 'View Programs / Katalog' event
export const trackViewPrograms = (source = 'Homepage') => {
  const params = { source };
  
  trackEvent('ViewPrograms', params);
  
  // Standard Ads events
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', { content_name: 'All Programs', ...params });
  }
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('ViewContent', { content_name: 'All Programs', content_type: 'product', ...params });
  }
};

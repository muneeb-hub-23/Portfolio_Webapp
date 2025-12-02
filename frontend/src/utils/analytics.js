import api from './api';

// Generate or retrieve session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Track page view
export const trackPageView = async (pagePath) => {
  try {
    const sessionId = getSessionId();
    const referrer = document.referrer || 'direct';

    await api.post('/analytics/track', {
      page_path: pagePath,
      referrer,
      session_id: sessionId,
    });
  } catch (error) {
    // Silently fail - don't disrupt user experience
    console.error('Analytics tracking error:', error);
  }
};

// Hook to track page views
export const usePageTracking = () => {
  const trackCurrentPage = () => {
    const path = window.location.pathname;
    trackPageView(path);
  };

  return { trackCurrentPage };
};

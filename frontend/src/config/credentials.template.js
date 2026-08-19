export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.muneebbaig.info/api',
  // Origin prepended to /uploads/... image paths stored in the DB.
  // Docker  → set VITE_UPLOADS_URL=  (empty) so nginx proxies /uploads/ on the same origin.
  // IIS/dev → set VITE_UPLOADS_URL=https://api.muneebbaig.info  (no trailing slash, no /api)
  backendUrl: import.meta.env.VITE_UPLOADS_URL || '',
};

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:7000/api',
  // Origin prepended to /uploads/... image paths stored in the DB.
  // Docker  → set VITE_UPLOADS_URL=  (empty) so nginx proxies /uploads/ on the same origin.
  // Set VITE_UPLOADS_URL to override the origin for uploaded images.
  backendUrl: import.meta.env.VITE_UPLOADS_URL ?? 'http://localhost:7000',
};

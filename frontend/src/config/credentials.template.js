export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.muneebbaig.info/api',
  // Base URL prepended to /uploads/... paths stored in the DB.
  // In Docker (nginx proxy): leave empty so /uploads/... resolves relative to the same origin.
  // In IIS / direct-backend deployments: set to the backend origin, e.g. https://api.muneebbaig.info
  backendUrl: import.meta.env.VITE_UPLOADS_URL ?? import.meta.env.VITE_BACKEND_URL ?? '',
};

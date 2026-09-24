Custom pages deployment
=======================

1. Select the existing production portfolio database in your SQL client.
2. Run `add_custom_pages.sql` from this directory. It creates only the new table and can be run again without deleting data.
3. Deploy the updated backend and frontend, rebuild the frontend, and restart the backend.
4. Open Admin → Custom Pages. Enter a title, a path such as `/about`, and HTML, then choose Create page.
5. Open the saved link and refresh it to confirm your server's SPA fallback is active. The existing Nginx and IIS frontend configurations already provide this fallback.

Pages are public immediately after saving. Editing the link moves the page; the previous link is no longer available. Deleting removes the page. Links are not automatically added to the portfolio navigation.

HTML fragments and complete documents with CSS are supported, with a 1 MB content limit. Content renders in a sandboxed iframe; JavaScript and form submission are disabled. Use absolute asset URLs or root-relative paths such as `/uploads/example.jpg`. Use `target="_top"` for links that should navigate the main window, or `target="_blank"` for a new tab.

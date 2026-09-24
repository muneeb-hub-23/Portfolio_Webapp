// An opaque sandbox keeps custom markup away from the site's storage and UI.
export default function CustomPageFrame({ title, content, preview = false }) {
  return <iframe title={title || 'Custom page preview'} srcDoc={content}
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
    referrerPolicy="no-referrer"
    className={`w-full border-0 bg-white ${preview ? 'h-[500px] rounded-lg' : 'h-screen block'}`} />;
}

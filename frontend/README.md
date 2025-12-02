# Portfolio Frontend

A modern, futuristic portfolio website built with React, Vite, and Tailwind CSS featuring 3D effects, smooth animations, and a fully-featured admin panel.

## Features

### Public Website
- **Hero Section**: 3D animated profile picture with smooth transitions
- **Skills Section**: Horizontal scrolling 3D skill cards with icons and descriptions
- **Projects Section**: 3D stacked project cards with videos, images, and reviews
- **Contact Form**: EmailJS integration for seamless email communication
- **Responsive Design**: Mobile-first approach with beautiful UI on all devices
- **Dark Theme**: Modern, futuristic dark theme with gradient accents

### Admin Panel
- **Dashboard**: Overview of portfolio statistics
- **Profile Management**: Update name, picture, and description
- **Skills Management**: Add, edit, delete skills with icons
- **Projects Management**: Manage projects with images, videos, and skill tags
- **Reviews Management**: Approve/reject visitor reviews
- **EmailJS Configuration**: Easy setup for contact form functionality

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure API Connection
Open `src/config/credentials.js` and update the backend URL:
```javascript
export const config = {
  apiUrl: 'http://localhost:5000/api',
  backendUrl: 'http://localhost:5000'
};
```

### 3. Start Development Server
```bash
npm run dev
```

The app will run on `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── admin/           # Admin panel components
│   │   ├── sections/        # Landing page sections
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── ProjectModal.jsx # Project details modal
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── admin/           # Admin pages
│   │   └── LandingPage.jsx  # Main landing page
│   ├── utils/
│   │   └── api.js           # Axios configuration
│   ├── config/
│   │   └── credentials.js   # Configuration file
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## Admin Panel Access

1. Navigate to `/admin/login`
2. Default credentials:
   - Username: `admin`
   - Password: `admin123`
3. **Important**: Change the default password immediately after first login!

## EmailJS Setup

1. Create account at [emailjs.com](https://www.emailjs.com/)
2. Add an Email Service (Gmail, Outlook, etc.)
3. Create an Email Template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (recipient)
4. Go to Admin Panel → Email Config
5. Enter your Service ID, Template ID, Public Key, and Target Email
6. Test the contact form on your portfolio

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Axios**: HTTP client for API requests
- **React Router**: Client-side routing
- **EmailJS**: Email service integration
- **React Hot Toast**: Beautiful notifications
- **Lucide React**: Modern icon library

## Features Breakdown

### 3D Effects
- Profile image with rotation animation
- Skill cards with perspective transforms
- Stacked project images with depth
- Hover effects with 3D transformations

### Animations
- Scroll-triggered animations
- Horizontal scrolling sections
- Smooth page transitions
- Loading states with spinners

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 768px), tablet (768px-1024px), desktop (> 1024px)
- Touch-friendly navigation
- Optimized images and layouts

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { /* Your primary colors */ },
  dark: { /* Your dark theme colors */ }
}
```

### Animations
Modify animation timings in `tailwind.config.js`:
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  // Add more animations
}
```

### Layout
Adjust section spacing and layout in respective component files.

## Tips for Production

1. Optimize images before uploading
2. Set up proper EmailJS configuration
3. Change default admin password
4. Configure CORS on backend for your domain
5. Use environment variables for API URLs
6. Enable compression on your server
7. Set up SSL certificate for HTTPS

## Support

For issues or questions:
1. Check backend is running on the configured port
2. Verify database is properly set up
3. Ensure EmailJS credentials are correct
4. Check browser console for errors

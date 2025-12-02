# Portfolio Web Application

A full-stack, modern portfolio website with a futuristic design featuring 3D effects, smooth animations, and a comprehensive admin panel. Built with React, Express.js, MySQL, and Tailwind CSS.

## 🚀 Features

### Frontend
- **Futuristic Design**: Dark theme with gradient accents and glass-morphism effects
- **3D Animations**: Profile pictures, skill cards, and project displays with 3D transforms
- **Horizontal Scrolling**: Skills and projects scroll horizontally on page scroll
- **Mobile-First**: Fully responsive design optimized for mobile devices
- **EmailJS Integration**: Contact form with email forwarding
- **Project Showcase**: Display projects with videos, images, and visitor reviews
- **Smooth Animations**: Framer Motion powered animations throughout

### Admin Panel
- **Dashboard**: Portfolio statistics and quick actions
- **Profile Management**: Update personal information and profile picture
- **Skills Management**: Add, edit, delete skills with icons and descriptions
- **Projects Management**: Manage projects with multiple images, YouTube videos, and skill tags
- **Reviews Management**: Approve/reject visitor reviews with filtering
- **EmailJS Configuration**: Easy setup for contact form credentials

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn
- Git (for version control)

## 📂 Documentation

- **[GITHUB_SETUP.md](./GITHUB_SETUP.md)** - Complete guide to set up GitHub repository
- **[GIT_COMMANDS.md](./GIT_COMMANDS.md)** - Quick reference for Git commands
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Quick start guide
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions

## 🛠️ Installation & Setup

### 1. Clone or Extract the Project
```bash
cd Portfolio_Webapp
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Database
1. Open `config/credentials.js`
2. Update database credentials:
```javascript
database: {
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'portfolio_db',
  port: 3306
}
```

#### Import Database Schema
```bash
mysql -u your_username -p < database/schema.sql
```
Or use MySQL Workbench:
- File → Run SQL Script → Select `database/schema.sql`

#### Start Backend Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```
Server runs on: `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Configure API Connection
Open `src/config/credentials.js` and verify:
```javascript
export const config = {
  apiUrl: 'http://localhost:5000/api',
  backendUrl: 'http://localhost:5000'
};
```

#### Start Frontend Server
```bash
npm run dev
```
App runs on: `http://localhost:3000`

## 🔐 Admin Access

1. Navigate to: `http://localhost:3000/admin/login`
2. Default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. **⚠️ IMPORTANT**: Change the password immediately after first login!

## 📧 EmailJS Configuration

### Setup Steps:
1. Create free account at [emailjs.com](https://www.emailjs.com/)
2. Add Email Service:
   - Dashboard → Email Services → Add New Service
   - Choose provider (Gmail, Outlook, etc.)
   - Follow authentication steps

3. Create Email Template:
   - Dashboard → Email Templates → Create New Template
   - Add these template variables:
     ```
     From: {{from_name}} ({{from_email}})
     Subject: {{subject}}
     Message: {{message}}
     ```

4. Get Your Credentials:
   - Service ID: Email Services → Your Service → Service ID
   - Template ID: Email Templates → Your Template → Template ID
   - Public Key: Account → General → Public Key

5. Configure in Admin Panel:
   - Login to admin panel
   - Navigate to Email Config
   - Enter all credentials
   - Save configuration

6. Test:
   - Visit portfolio contact section
   - Send test message
   - Check your target email inbox

## 📁 Project Structure

```
Portfolio_Webapp/
├── backend/
│   ├── config/
│   │   └── credentials.js        # Backend & DB configuration
│   ├── database/
│   │   ├── db.js                 # Database connection
│   │   └── schema.sql            # Database schema
│   ├── middleware/
│   │   └── auth.js               # JWT authentication
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── profile.js            # Profile management
│   │   ├── skills.js             # Skills CRUD
│   │   ├── projects.js           # Projects CRUD
│   │   ├── reviews.js            # Reviews management
│   │   └── emailjs.js            # EmailJS config
│   ├── uploads/                  # Uploaded files
│   ├── package.json
│   └── server.js                 # Main server file
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/            # Admin panel components
│   │   │   ├── sections/         # Landing page sections
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── admin/            # Admin pages
│   │   │   └── LandingPage.jsx
│   │   ├── utils/
│   │   │   └── api.js            # API configuration
│   │   ├── config/
│   │   │   └── credentials.js    # Frontend configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── README.md                     # This file
```

## 🎨 Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- EmailJS
- Lucide Icons

### Backend
- Express.js
- MySQL
- JSON Web Tokens (JWT)
- Bcrypt
- Multer (file uploads)
- CORS

## 🎯 Usage Guide

### Adding Content

1. **Update Profile**:
   - Admin Panel → Profile
   - Upload picture, add name and description
   - Save changes

2. **Add Skills**:
   - Admin Panel → Skills
   - Click "Add Skill"
   - Enter name, icon URL, description
   - Set display order
   - Save

3. **Add Projects**:
   - Admin Panel → Projects
   - Click "Add Project"
   - Enter project details
   - Upload images
   - Add YouTube video link (optional)
   - Select related skills
   - Save

4. **Manage Reviews**:
   - Admin Panel → Reviews
   - Filter by status (All/Approved/Pending)
   - Approve or reject reviews
   - Delete inappropriate reviews

5. **Configure Email**:
   - Admin Panel → Email Config
   - Enter EmailJS credentials
   - Save configuration
   - Test contact form

## 🔧 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Change primary color
    600: '#0284c7',
    // ...
  }
}
```

### Modify Animations
Edit animation timings in `frontend/tailwind.config.js`:
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'slide-left': 'slide-left 30s linear infinite',
}
```

### Change Backend Port
Edit `backend/config/credentials.js`:
```javascript
server: {
  host: 'localhost',
  port: 5000  // Change port number
}
```

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach:
- Breakpoints: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Touch-friendly navigation
- Optimized layouts for all screen sizes
- Responsive images and videos

## 🔒 Security Notes

1. **Change Default Password**: Immediately change the default admin password
2. **JWT Secret**: Update JWT secret in production (`backend/config/credentials.js`)
3. **Database Credentials**: Never commit real credentials to version control
4. **CORS**: Configure CORS for your production domain
5. **File Uploads**: Validate and sanitize all file uploads
6. **SQL Injection**: All queries use parameterized statements

## 🚀 Production Deployment

### Backend
1. Set up production database
2. Update credentials in `config/credentials.js`
3. Set NODE_ENV to 'production'
4. Use process manager (PM2, Forever)
5. Set up reverse proxy (Nginx, Apache)
6. Enable SSL certificate

### Frontend
1. Update API URLs in `config/credentials.js`
2. Build production bundle: `npm run build`
3. Deploy `dist` folder to hosting (Vercel, Netlify, etc.)
4. Configure environment variables
5. Enable caching and compression

## 🐛 Troubleshooting

### Backend Issues
- **Database connection error**: Check MySQL is running and credentials are correct
- **Port already in use**: Change port in credentials.js
- **Module not found**: Run `npm install` in backend folder

### Frontend Issues
- **API connection failed**: Verify backend is running and URL is correct
- **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- **Images not loading**: Check backend URL in credentials.js

### EmailJS Issues
- **Emails not sending**: Verify credentials in admin panel
- **Template errors**: Check template variables match
- **Rate limit**: EmailJS free tier has sending limits

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/change-password` - Change password

### Profile
- `GET /api/profile` - Get profile (public)
- `PUT /api/profile` - Update profile (admin)

### Skills
- `GET /api/skills` - List all skills (public)
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/:id` - Update skill (admin)
- `DELETE /api/skills/:id` - Delete skill (admin)

### Projects
- `GET /api/projects` - List all projects (public)
- `GET /api/projects/:id` - Get project details (public)
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Reviews
- `GET /api/reviews/project/:id` - Get project reviews (public)
- `POST /api/reviews` - Submit review (public)
- `GET /api/reviews/admin/all` - All reviews (admin)
- `PATCH /api/reviews/:id/approve` - Approve review (admin)
- `DELETE /api/reviews/:id` - Delete review (admin)

### EmailJS
- `GET /api/emailjs/config` - Get public config (public)
- `GET /api/emailjs/config/admin` - Get full config (admin)
- `PUT /api/emailjs/config` - Update config (admin)

## 📄 License

This project is provided as-is for personal and commercial use.

## 💡 Tips

- Optimize images before uploading (recommended: WebP format, < 1MB)
- Use high-quality icons from sites like [Flaticon](https://www.flaticon.com/)
- Keep skill descriptions concise (2-3 sentences)
- Add projects regularly to keep portfolio fresh
- Respond to reviews promptly
- Test contact form after EmailJS setup
- Regular database backups recommended

## 🎉 Getting Started Checklist

- [ ] Install Node.js and MySQL
- [ ] Import database schema
- [ ] Update backend credentials
- [ ] Start backend server
- [ ] Install frontend dependencies
- [ ] Start frontend server
- [ ] Login to admin panel
- [ ] Change default password
- [ ] Update profile information
- [ ] Add skills
- [ ] Create projects
- [ ] Configure EmailJS
- [ ] Test contact form
- [ ] Review and approve submitted reviews

---

**Need Help?** Check the troubleshooting section or review the inline code comments for detailed explanations.

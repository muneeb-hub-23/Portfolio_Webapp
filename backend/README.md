# Portfolio Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database
1. Open `config/credentials.js`
2. Update the database credentials:
   - host (default: localhost)
   - user (your MySQL username)
   - password (your MySQL password)
   - database (default: portfolio_db)
   - port (default: 3306)

### 3. Import Database Schema
```bash
mysql -u your_username -p < database/schema.sql
```

Or import using MySQL Workbench:
- Open MySQL Workbench
- Connect to your database
- File -> Run SQL Script
- Select `database/schema.sql`

### 4. Change Default Admin Password
Default credentials:
- Username: `admin`
- Password: `admin123`

**IMPORTANT:** Change this password immediately after first login!

### 5. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/change-password` - Change admin password

### Profile
- `GET /api/profile` - Get profile (public)
- `PUT /api/profile` - Update profile (protected)

### Skills
- `GET /api/skills` - Get all skills (public)
- `GET /api/skills/:id` - Get single skill (public)
- `POST /api/skills` - Create skill (protected)
- `PUT /api/skills/:id` - Update skill (protected)
- `DELETE /api/skills/:id` - Delete skill (protected)

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get single project (public)
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Reviews
- `GET /api/reviews/project/:projectId` - Get approved reviews for a project (public)
- `GET /api/reviews/admin/all` - Get all reviews (protected)
- `POST /api/reviews` - Create review (public)
- `PUT /api/reviews/:id` - Update review (protected)
- `PATCH /api/reviews/:id/approve` - Approve/reject review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected)

### EmailJS Configuration
- `GET /api/emailjs/config` - Get EmailJS public config (public)
- `GET /api/emailjs/config/admin` - Get full EmailJS config (protected)
- `PUT /api/emailjs/config` - Update EmailJS config (protected)

## File Uploads
Uploaded files are stored in:
- Profile pictures: `uploads/profile/`
- Project images: `uploads/projects/`

## Notes
- All protected routes require JWT token in Authorization header: `Bearer <token>`
- File size limits: Profile images (5MB), Project images (10MB)
- Supported image formats: JPEG, JPG, PNG, GIF, WEBP

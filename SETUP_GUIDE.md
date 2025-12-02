# Quick Setup Guide

Follow these steps to get your portfolio up and running in minutes!

## Step 1: Prerequisites
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Install MySQL from [mysql.com](https://www.mysql.com/)

## Step 2: Database Setup (5 minutes)

### Option A: Using MySQL Command Line
```bash
# Login to MySQL
mysql -u root -p

# Create database and import schema
mysql -u root -p < backend/database/schema.sql
```

### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Click: File → Run SQL Script
4. Select: `backend/database/schema.sql`
5. Click: Run

## Step 3: Backend Configuration (2 minutes)

1. Open `backend/config/credentials.js`
2. Update these values:
```javascript
database: {
  host: 'localhost',
  user: 'root',              // Your MySQL username
  password: 'YOUR_PASSWORD',  // Your MySQL password
  database: 'portfolio_db',
  port: 3306
}
```
3. Save the file

## Step 4: Install & Start Backend (3 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start server
npm run dev
```

✅ Backend running at: http://localhost:5000

## Step 5: Install & Start Frontend (3 minutes)

Open a NEW terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at: http://localhost:3000

## Step 6: Access Admin Panel (1 minute)

1. Open browser: http://localhost:3000/admin/login
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. **IMPORTANT**: Change password immediately!

## Step 7: Add Your Content (10 minutes)

### Update Profile
1. Go to: Admin Panel → Profile
2. Upload your photo
3. Add your name and description
4. Save

### Add Skills
1. Go to: Admin Panel → Skills
2. Click "Add Skill"
3. Enter skill name (e.g., "React.js")
4. Add icon URL from [flaticon.com](https://www.flaticon.com/) or [icons8.com](https://icons8.com/)
5. Write description
6. Save

### Add Projects
1. Go to: Admin Panel → Projects
2. Click "Add Project"
3. Fill in project details
4. Upload project images
5. Add YouTube video link (optional)
6. Select related skills
7. Save

## Step 8: Setup Contact Form (5 minutes)

### Get EmailJS Credentials
1. Create account: [emailjs.com](https://www.emailjs.com/)
2. Add Email Service:
   - Click: Email Services → Add New Service
   - Choose: Gmail (or your provider)
   - Follow authentication steps
   
3. Create Email Template:
   - Click: Email Templates → Create New Template
   - Add these variables in template:
     ```
     From: {{from_name}} <{{from_email}}>
     Subject: {{subject}}
     
     {{message}}
     ```
   - Save template

4. Get your credentials:
   - Service ID: From Email Services page
   - Template ID: From Email Templates page
   - Public Key: Account → General section

### Configure in Admin Panel
1. Go to: Admin Panel → Email Config
2. Paste your credentials:
   - Service ID
   - Template ID
   - Public Key
   - Your email address (where messages will be sent)
3. Save

### Test Contact Form
1. Visit: http://localhost:3000
2. Scroll to Contact section
3. Fill and submit test message
4. Check your email inbox

## Step 9: Review Your Portfolio (2 minutes)

1. Visit: http://localhost:3000
2. Check all sections:
   - ✅ Hero with your profile
   - ✅ Skills scrolling horizontally
   - ✅ Projects with 3D effects
   - ✅ Contact form working
3. Test on mobile (press F12 → Toggle device toolbar)

## Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials in `backend/config/credentials.js`
- Make sure port 5000 is not in use

### Frontend won't start
- Check Node.js is installed: `node --version`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Make sure port 3000 is not in use

### Images not showing
- Verify backend is running
- Check `frontend/src/config/credentials.js` has correct backend URL
- Clear browser cache

### Contact form not working
- Verify EmailJS credentials in Admin Panel
- Check browser console for errors
- Make sure you clicked "Save" after entering credentials

### Can't login to admin
- Default credentials: admin / admin123
- Check backend is running
- Clear browser local storage

## Next Steps

### Customize Design
- Edit colors in `frontend/tailwind.config.js`
- Modify animations
- Add your branding

### Add More Content
- Add more skills
- Upload more projects
- Gather and approve reviews

### Deploy to Production
- See README.md for deployment guide
- Set up domain and hosting
- Configure SSL certificate

## Need Help?

Check the main README.md file for detailed documentation, API endpoints, and advanced configuration options.

---

**Congratulations!** 🎉 Your portfolio is now ready!

Visit: http://localhost:3000

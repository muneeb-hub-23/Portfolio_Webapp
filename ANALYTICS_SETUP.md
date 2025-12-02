# Analytics Setup Guide

## 📊 Website Analytics System

Your portfolio now includes a comprehensive analytics system to track visitors, page views, and user behavior.

## 🗄️ Database Setup

### Import Analytics Tables

Run the analytics schema SQL file to create the necessary tables:

```bash
mysql -u root -p portfolio_db < backend/database/analytics_schema.sql
```

This creates the following tables:
- **page_views**: Individual page view tracking
- **analytics_daily**: Daily aggregated statistics
- **popular_pages**: Most visited pages
- **visitor_sessions**: User session tracking

## 📦 Frontend Dependencies

Install the new chart library:

```bash
cd frontend
npm install recharts
```

## 🚀 Start Using Analytics

### 1. Restart Backend Server

```bash
cd backend
npm run dev
```

### 2. Restart Frontend

```bash
cd frontend
npm run dev
```

### 3. Access Analytics Dashboard

1. Login to admin panel: http://localhost:3000/admin/login
2. Click on **"Analytics"** in the sidebar
3. View your website statistics and charts!

## 📈 Analytics Features

### Dashboard Overview

**Key Metrics:**
- 📊 **Total Views**: All-time page views
- 👥 **Unique Visitors**: Distinct visitors by IP
- 📈 **Today's Views**: Page views today
- 👤 **Today's Visitors**: Unique visitors today
- 💻 **Active Now**: Current active sessions (last 30 min)

### Charts & Visualizations

1. **Views Over Time (Line Chart)**
   - Page views trend
   - Unique visitors trend
   - Configurable time range (7, 14, 30, 90 days)

2. **Device Distribution (Pie Chart)**
   - Desktop vs Mobile vs Tablet
   - Real-time device tracking

3. **Browser Distribution (Bar Chart)**
   - Chrome, Firefox, Safari, Edge, etc.
   - Helps optimize for popular browsers

4. **24-Hour Activity (Bar Chart)**
   - Hourly activity patterns
   - Find peak traffic times

5. **Popular Pages Table**
   - Most visited pages
   - View counts
   - Unique visitors per page
   - Last viewed timestamp

## 🔧 How It Works

### Automatic Tracking

The system automatically tracks:
- ✅ **Every page visit** on your portfolio
- ✅ **Visitor IP address** (anonymized)
- ✅ **Device type** (Desktop/Mobile/Tablet)
- ✅ **Browser** (Chrome, Firefox, Safari, etc.)
- ✅ **Referrer** (where visitors came from)
- ✅ **Session duration**
- ✅ **Page view timestamps**

### Privacy-Friendly

- No cookies required
- No personal data collected
- IP addresses used only for unique visitor counting
- Complies with basic privacy standards

## 📊 Tracked Data

### What's Tracked:

| Data Point | Description |
|------------|-------------|
| Page Path | URL visited (e.g., `/`, `/projects`) |
| Visitor IP | For unique visitor counting |
| User Agent | Browser and device information |
| Referrer | Where the visitor came from |
| Device Type | Desktop, Mobile, or Tablet |
| Browser | Chrome, Firefox, Safari, etc. |
| Timestamp | When the visit occurred |
| Session ID | Groups visits into sessions |

### What's NOT Tracked:

- ❌ Personal information
- ❌ Form inputs
- ❌ Passwords or credentials
- ❌ Cookies
- ❌ Scroll depth
- ❌ Click tracking

## 🎯 Use Cases

### 1. **Monitor Traffic Growth**
Track how your portfolio views increase over time.

### 2. **Optimize for Devices**
See if more visitors use mobile or desktop, optimize accordingly.

### 3. **Find Popular Content**
Discover which projects or skills get the most views.

### 4. **Identify Peak Times**
Know when visitors are most active to schedule updates.

### 5. **Track Referrers**
See where your traffic comes from (social media, job boards, etc.).

## 🔒 Security & Performance

### API Protection

- ✅ Analytics viewing requires admin authentication
- ✅ Tracking endpoint is public (for visitor tracking)
- ✅ SQL injection prevention
- ✅ Rate limiting recommended (add if needed)

### Performance Optimization

The tracking is designed to be lightweight:
- Async tracking (doesn't slow down page loads)
- Silent failures (errors don't affect user experience)
- Efficient database queries with indexes
- Session-based tracking reduces database writes

## 🛠️ Customization

### Change Time Ranges

Edit `Analytics.jsx` to add custom time ranges:

```javascript
<option value={180}>Last 6 Months</option>
<option value={365}>Last Year</option>
```

### Add More Metrics

Extend the backend API (`backend/routes/analytics.js`) to track:
- Geographic location (requires IP geolocation service)
- Screen resolutions
- Operating systems
- Custom events

### Custom Charts

Add more charts using Recharts library:
- Area charts
- Composed charts
- Scatter plots
- Radar charts

See [Recharts Documentation](https://recharts.org/en-US/)

## 📱 Mobile Responsive

The analytics dashboard is fully responsive:
- ✅ Works on desktop, tablet, and mobile
- ✅ Charts adapt to screen size
- ✅ Touch-friendly interface
- ✅ Readable on small screens

## 🐛 Troubleshooting

### Analytics not tracking?

1. **Check database tables exist:**
   ```bash
   mysql -u root -p
   USE portfolio_db;
   SHOW TABLES LIKE 'page_views';
   ```

2. **Check backend console for errors**

3. **Verify frontend is calling tracking:**
   Open browser DevTools → Network tab → Look for `/analytics/track` requests

### Charts not showing?

1. **Make sure recharts is installed:**
   ```bash
   cd frontend
   npm install recharts
   ```

2. **Check browser console for errors**

3. **Verify data exists:**
   Visit your portfolio, then check analytics dashboard

### No data in analytics?

1. Visit your portfolio homepage (generates page views)
2. Wait a few seconds
3. Refresh analytics dashboard
4. Data should appear

## 📚 Advanced Features

### Export Analytics Data

Add export functionality to download reports:
- CSV export
- PDF reports
- Email scheduled reports

### Real-Time Analytics

Implement WebSocket for live visitor tracking:
- See visitors in real-time
- Live page view updates
- Active sessions map

### A/B Testing

Track different versions of content:
- Compare project descriptions
- Test call-to-action buttons
- Optimize conversion rates

## 🎨 Color Customization

Charts use your theme colors. Customize in `Analytics.jsx`:

```javascript
const COLORS = [
  '#0ea5e9',  // Primary blue
  '#8b5cf6',  // Purple
  '#ec4899',  // Pink
  '#f59e0b',  // Orange
  '#10b981'   // Green
];
```

## 📖 API Endpoints

### Public Endpoints:
- `POST /api/analytics/track` - Track page view

### Protected Endpoints (Admin Only):
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/views-timeline?days=7` - Views over time
- `GET /api/analytics/popular-pages` - Most visited pages
- `GET /api/analytics/devices` - Device statistics
- `GET /api/analytics/browsers` - Browser statistics
- `GET /api/analytics/hourly-activity` - 24-hour activity

## ✨ Tips

1. **Check analytics daily** to spot trends
2. **Compare week-over-week** growth
3. **Mobile optimization** if mobile traffic is high
4. **Update popular content** that drives traffic
5. **Track referrers** to focus marketing efforts

---

**Congratulations!** Your portfolio now has professional analytics tracking! 📊📈

Visit `/admin/analytics` to see your data in action.

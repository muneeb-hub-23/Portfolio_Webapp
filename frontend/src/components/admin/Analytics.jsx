import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Users, Eye, Activity, Monitor, Globe, Clock
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import api from '../../utils/api';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({});
  const [viewsTimeline, setViewsTimeline] = useState([]);
  const [popularPages, setPopularPages] = useState([]);
  const [deviceStats, setDeviceStats] = useState([]);
  const [browserStats, setBrowserStats] = useState([]);
  const [hourlyActivity, setHourlyActivity] = useState([]);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [dashboard, timeline, pages, devices, browsers, hourly] = await Promise.all([
        api.get('/analytics/dashboard'),
        api.get(`/analytics/views-timeline?days=${timeRange}`),
        api.get('/analytics/popular-pages'),
        api.get('/analytics/devices'),
        api.get('/analytics/browsers'),
        api.get('/analytics/hourly-activity')
      ]);

      setDashboardStats(dashboard.data);
      setViewsTimeline(timeline.data);
      setPopularPages(pages.data);
      setDeviceStats(devices.data);
      setBrowserStats(browsers.data);
      setHourlyActivity(hourly.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold gradient-text">Website Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="px-4 py-2 bg-dark-100 border border-dark-300 rounded-lg text-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value={7}>Last 7 Days</option>
          <option value={14}>Last 14 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={<Eye className="w-6 h-6" />}
          title="Total Views"
          value={dashboardStats.totalViews}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Unique Visitors"
          value={dashboardStats.uniqueVisitors}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Today's Views"
          value={dashboardStats.todayViews}
          color="from-orange-500 to-red-500"
        />
        <StatCard
          icon={<Activity className="w-6 h-6" />}
          title="Today's Visitors"
          value={dashboardStats.todayVisitors}
          color="from-green-500 to-teal-500"
        />
        <StatCard
          icon={<Monitor className="w-6 h-6" />}
          title="Active Now"
          value={dashboardStats.activeSessions}
          color="from-pink-500 to-rose-500"
        />
      </div>

      {/* Views Timeline Chart */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary-500" />
          Views Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewsTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              stroke="#666"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px' }}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={2} name="Page Views" />
            <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={2} name="Unique Visitors" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Device & Browser Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary-500" />
            Device Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deviceStats}
                dataKey="count"
                nameKey="device_type"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={(entry) => `${entry.device_type}: ${entry.count}`}
              >
                {deviceStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Browser Distribution */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-500" />
            Browser Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={browserStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="browser" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Activity */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-500" />
          24-Hour Activity
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hourlyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="hour" 
              stroke="#666"
              tickFormatter={(value) => `${value}:00`}
            />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px' }}
              labelFormatter={(value) => `${value}:00 - ${value}:59`}
            />
            <Bar dataKey="views" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Popular Pages */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4">Popular Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-300">
                <th className="text-left py-3 px-4 text-dark-700">Page</th>
                <th className="text-right py-3 px-4 text-dark-700">Views</th>
                <th className="text-right py-3 px-4 text-dark-700">Unique Visitors</th>
                <th className="text-right py-3 px-4 text-dark-700">Last Viewed</th>
              </tr>
            </thead>
            <tbody>
              {popularPages.map((page, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-dark-200 hover:bg-dark-100 transition-colors"
                >
                  <td className="py-3 px-4">
                    <code className="text-primary-500">{page.page_path}</code>
                  </td>
                  <td className="text-right py-3 px-4 text-dark-700">
                    {page.view_count.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-dark-700">
                    {page.unique_visitors.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-dark-700 text-sm">
                    {new Date(page.last_viewed).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 hover:shadow-lg transition-all"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <p className="text-dark-500 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-dark-800">{value?.toLocaleString() || 0}</p>
    </motion.div>
  );
};

export default Analytics;

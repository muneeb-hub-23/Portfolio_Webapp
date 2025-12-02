import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  MessageCircle,
  Mail,
  LogOut,
  LayoutDashboard,
  ExternalLink,
  BarChart3,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/profile', label: 'Profile', icon: User },
    { path: '/admin/skills', label: 'Skills', icon: Code },
    { path: '/admin/projects', label: 'Projects', icon: Briefcase },
    { path: '/admin/reviews', label: 'Reviews', icon: MessageCircle },
    { path: '/admin/emailjs', label: 'Email Config', icon: Mail },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 glass-card border-r border-dark-200 fixed h-screen">
        <div className="p-6 border-b border-dark-200">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center glow-effect">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-dark-600 hover:bg-dark-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-dark-200 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-600 hover:bg-dark-200 transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-medium">View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed left-0 top-0 bottom-0 w-64 glass-card z-50 md:hidden"
            >
              <div className="p-6 border-b border-dark-200 flex justify-between items-center">
                <span className="text-xl font-bold gradient-text">Admin Panel</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-dark-200 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive(item.path)
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'text-dark-600 hover:bg-dark-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-dark-200 space-y-2">
                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-dark-600 hover:bg-dark-200 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="font-medium">View Site</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="glass-card border-b border-dark-200 px-4 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-dark-200 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="md:block hidden">
              <h1 className="text-2xl font-bold text-dark-800">
                {menuItems.find((item) => item.path === location.pathname)?.label || 'Admin Panel'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                target="_blank"
                className="hidden md:flex items-center gap-2 btn-secondary text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

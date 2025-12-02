import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Code, Briefcase, MessageCircle, TrendingUp } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    reviews: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [skillsRes, projectsRes, reviewsRes] = await Promise.all([
        api.get('/skills'),
        api.get('/projects'),
        api.get('/reviews/admin/all'),
      ]);

      setStats({
        skills: skillsRes.data.length,
        projects: projectsRes.data.length,
        reviews: reviewsRes.data.length,
        pendingReviews: reviewsRes.data.filter((r) => !r.is_approved).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Skills',
      value: stats.skills,
      icon: Code,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Projects',
      value: stats.projects,
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Total Reviews',
      value: stats.reviews,
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h2 className="text-3xl font-bold gradient-text mb-2">
          Welcome Back! 👋
        </h2>
        <p className="text-dark-600">
          Here's an overview of your portfolio statistics
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-dark-800 mb-1">
                {card.value}
              </h3>
              <p className="text-dark-500 text-sm">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold text-dark-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/skills"
            className="btn-primary text-center"
          >
            Manage Skills
          </a>
          <a
            href="/admin/projects"
            className="btn-primary text-center"
          >
            Manage Projects
          </a>
          <a
            href="/admin/reviews"
            className="btn-primary text-center"
          >
            Review Management
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Lock, MessageCircle, Linkedin, Youtube, Facebook, Eye, EyeOff } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Settings = () => {
  const [adminInfo, setAdminInfo] = useState({ username: '' });
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: '',
    linkedin: '',
    youtube: '',
    facebook: ''
  });
  const [usernameForm, setUsernameForm] = useState({
    currentPassword: '',
    newUsername: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
    usernameCurrent: false
  });
  const [loading, setLoading] = useState({
    username: false,
    password: false,
    social: false
  });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [adminRes, socialRes] = await Promise.all([
        api.get('/settings/admin-info'),
        api.get('/settings/social-links')
      ]);
      setAdminInfo(adminRes.data);
      setSocialLinks(socialRes.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    if (!usernameForm.currentPassword || !usernameForm.newUsername) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading({ ...loading, username: true });
    try {
      const response = await api.post('/settings/change-username', usernameForm);
      
      // Update token and admin info in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      
      setAdminInfo(response.data.admin);
      setUsernameForm({ currentPassword: '', newUsername: '' });
      toast.success('Username updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update username');
    } finally {
      setLoading({ ...loading, username: false });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading({ ...loading, password: true });
    try {
      await api.post('/settings/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  const handleSocialLinksUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, social: true });
    try {
      await api.put('/settings/social-links', socialLinks);
      toast.success('Social links updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update social links');
    } finally {
      setLoading({ ...loading, social: false });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Change Username Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-800">Change Username</h2>
            <p className="text-sm text-dark-500">Current: {adminInfo.username}</p>
          </div>
        </div>

        <form onSubmit={handleUsernameChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.usernameCurrent ? 'text' : 'password'}
                value={usernameForm.currentPassword}
                onChange={(e) => setUsernameForm({ ...usernameForm, currentPassword: e.target.value })}
                className="input-field pr-12"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('usernameCurrent')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-700"
              >
                {showPasswords.usernameCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              New Username
            </label>
            <input
              type="text"
              value={usernameForm.newUsername}
              onChange={(e) => setUsernameForm({ ...usernameForm, newUsername: e.target.value })}
              className="input-field"
              placeholder="Enter new username"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading.username}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {loading.username ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Update Username
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Change Password Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-800">Change Password</h2>
            <p className="text-sm text-dark-500">Update your account password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="input-field pr-12"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-700"
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="input-field pr-12"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-700"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="input-field pr-12"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-700"
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading.password}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {loading.password ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Update Password
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark-800">Social Links</h2>
            <p className="text-sm text-dark-500">Configure your social media profiles</p>
          </div>
        </div>

        <form onSubmit={handleSocialLinksUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                WhatsApp Number
              </div>
            </label>
            <input
              type="text"
              value={socialLinks.whatsapp}
              onChange={(e) => setSocialLinks({ ...socialLinks, whatsapp: e.target.value })}
              className="input-field"
              placeholder="e.g., +923001234567 (with country code)"
            />
            <p className="text-xs text-dark-500 mt-1">Enter number with country code (e.g., +92 for Pakistan)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-600" />
                LinkedIn Profile URL
              </div>
            </label>
            <input
              type="url"
              value={socialLinks.linkedin}
              onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
              className="input-field"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                YouTube Channel URL
              </div>
            </label>
            <input
              type="url"
              value={socialLinks.youtube}
              onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
              className="input-field"
              placeholder="https://youtube.com/@your-channel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-500" />
                Facebook Profile URL
              </div>
            </label>
            <input
              type="url"
              value={socialLinks.facebook}
              onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
              className="input-field"
              placeholder="https://facebook.com/your-profile"
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading.social}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading.social ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Social Links
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Settings;

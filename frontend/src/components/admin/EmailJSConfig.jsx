import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Mail, Key, Send } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const EmailJSConfig = () => {
  const [config, setConfig] = useState({
    service_id: '',
    template_id: '',
    public_key: '',
    target_email: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await api.get('/emailjs/config/admin');
      setConfig(response.data);
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/emailjs/config', config);
      toast.success('EmailJS configuration updated successfully!');
      fetchConfig();
    } catch (error) {
      toast.error('Failed to update configuration');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">
            EmailJS Configuration
          </h2>
          <p className="text-dark-600">
            Configure EmailJS to enable contact form functionality
          </p>
        </div>

        {/* Instructions */}
        <div className="glass-card p-4 mb-6 bg-primary-50 border border-primary-200">
          <h3 className="font-semibold text-primary-800 mb-2">
            How to get EmailJS credentials:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-primary-700">
            <li>Create an account at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
            <li>Add a new Email Service (Gmail, Outlook, etc.)</li>
            <li>Create an Email Template</li>
            <li>Copy your Service ID, Template ID, and Public Key</li>
            <li>Paste them below along with your target email</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service ID */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Service ID *
            </label>
            <input
              type="text"
              value={config.service_id}
              onChange={(e) =>
                setConfig({ ...config, service_id: e.target.value })
              }
              required
              className="input-field"
              placeholder="service_xxxxxxx"
            />
            <p className="text-xs text-dark-500 mt-1">
              Found in EmailJS Dashboard → Email Services
            </p>
          </div>

          {/* Template ID */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <Send className="w-4 h-4 inline mr-1" />
              Template ID *
            </label>
            <input
              type="text"
              value={config.template_id}
              onChange={(e) =>
                setConfig({ ...config, template_id: e.target.value })
              }
              required
              className="input-field"
              placeholder="template_xxxxxxx"
            />
            <p className="text-xs text-dark-500 mt-1">
              Found in EmailJS Dashboard → Email Templates
            </p>
          </div>

          {/* Public Key */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <Key className="w-4 h-4 inline mr-1" />
              Public Key *
            </label>
            <input
              type="text"
              value={config.public_key}
              onChange={(e) =>
                setConfig({ ...config, public_key: e.target.value })
              }
              required
              className="input-field"
              placeholder="xxxxxxxxxxxx"
            />
            <p className="text-xs text-dark-500 mt-1">
              Found in EmailJS Dashboard → Account → General
            </p>
          </div>

          {/* Target Email */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Target Email Address *
            </label>
            <input
              type="email"
              value={config.target_email}
              onChange={(e) =>
                setConfig({ ...config, target_email: e.target.value })
              }
              required
              className="input-field"
              placeholder="your@email.com"
            />
            <p className="text-xs text-dark-500 mt-1">
              Email address where contact form submissions will be sent
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Configuration
              </>
            )}
          </motion.button>
        </form>

        {/* Test Section */}
        <div className="mt-6 p-4 glass-card bg-dark-100">
          <h3 className="font-semibold text-dark-800 mb-2">
            Test Your Configuration
          </h3>
          <p className="text-sm text-dark-600 mb-3">
            After saving, visit your portfolio's contact section and send a test message to verify everything works correctly.
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block text-sm"
          >
            Visit Portfolio →
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailJSConfig;

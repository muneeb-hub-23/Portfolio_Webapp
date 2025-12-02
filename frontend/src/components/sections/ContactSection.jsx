import { motion } from 'framer-motion';
import { Mail, Send, User, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [emailConfig, setEmailConfig] = useState(null);

  useEffect(() => {
    fetchEmailConfig();
  }, []);

  const fetchEmailConfig = async () => {
    try {
      const response = await api.get('/emailjs/config');
      setEmailConfig(response.data);
    } catch (error) {
      console.error('Error fetching email config:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailConfig) {
      toast.error('Email service not configured');
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        emailConfig.service_id,
        emailConfig.template_id,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Portfolio Owner',
        },
        emailConfig.public_key
      );

      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Email send error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl top-1/4 left-1/3 animate-float"></div>
        <div className="absolute w-96 h-96 bg-primary-600/10 rounded-full blur-3xl bottom-1/4 right-1/3 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-4">
            <Mail className="w-5 h-5 text-primary-500" />
            <span className="text-primary-500 font-semibold">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Let's Work Together</span>
          </h2>
          <p className="text-dark-500 text-lg md:text-xl">
            Have a project in mind? Let's discuss how we can collaborate
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>
            </div>

            {/* Subject Field */}
            <motion.div whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="What's this about?"
              />
            </motion.div>

            {/* Message Field */}
            <motion.div whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Message
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-dark-500" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="input-field pl-12 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || !emailConfig}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-dark-500"
        >
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

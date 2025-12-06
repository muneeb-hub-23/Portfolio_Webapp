import { motion } from 'framer-motion';
import { Mail, Send, User, MessageCircle, Linkedin, Youtube, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import api from '../../utils/api';

// WhatsApp icon component
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [emailConfig, setEmailConfig] = useState(null);
  const [profile, setProfile] = useState({ name: 'Portfolio' });
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: '',
    linkedin: '',
    youtube: '',
    facebook: ''
  });

  useEffect(() => {
    fetchEmailConfig();
    fetchProfile();
    fetchSocialLinks();
  }, []);

  const fetchEmailConfig = async () => {
    try {
      const response = await api.get('/emailjs/config');
      setEmailConfig(response.data);
    } catch (error) {
      console.error('Error fetching email config:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await api.get('/settings/social-links');
      setSocialLinks(response.data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  const openWhatsApp = () => {
    if (socialLinks.whatsapp) {
      const number = socialLinks.whatsapp.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${number}`, '_blank');
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
          sender_mail: formData.email,
          reply_to: formData.email,
          to_name: profile.name || 'Portfolio Owner',
          message: formData.message,
        },
        emailConfig.public_key
      );

      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
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
          className="text-center mt-12"
        >
          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.whatsapp && (
              <motion.button
                onClick={openWhatsApp}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </motion.button>
            )}
            {socialLinks.linkedin && (
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            )}
            {socialLinks.youtube && (
              <motion.a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                title="YouTube Channel"
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
            )}
            {socialLinks.facebook && (
              <motion.a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                title="Facebook Profile"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
            )}
          </div>
          <p className="text-dark-500">© {new Date().getFullYear()} {profile.name || 'Portfolio'}. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, User } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { config } from '../../config/credentials';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    picture: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data);
      if (response.data.picture) {
        setPreviewImage(`${config.backendUrl}${response.data.picture}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, picture: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('description', profile.description);
      if (profile.picture instanceof File) {
        formData.append('picture', profile.picture);
      }

      await api.put('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
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
        <h2 className="text-2xl font-bold gradient-text mb-6">
          Profile Management
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-dark-200 flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-dark-500" />
                )}
              </div>
              <label
                htmlFor="picture"
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors"
              >
                <Upload className="w-5 h-5 text-white" />
              </label>
              <input
                type="file"
                id="picture"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-dark-800 mb-1">
                Profile Picture
              </h3>
              <p className="text-sm text-dark-500">
                Upload a professional photo (Max 5MB)
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              required
              className="input-field"
              placeholder="Enter your name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">
              Description
            </label>
            <textarea
              value={profile.description}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              rows="6"
              className="input-field resize-none"
              placeholder="Tell visitors about yourself..."
            />
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
                Save Changes
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileManagement;

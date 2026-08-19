import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { config } from '../../config/credentials.template';

const SkillsManagement = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    display_order: 0,
  });
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description || '');
      data.append('display_order', formData.display_order);
      
      if (iconFile) {
        data.append('icon', iconFile);
      }

      if (editingId) {
        await api.put(`/skills/${editingId}`, data);
        toast.success('Skill updated successfully!');
      } else {
        await api.post('/skills', data);
        toast.success('Skill added successfully!');
      }
      fetchSkills();
      resetForm();
    } catch (error) {
      console.error('Save skill error:', error);
      toast.error(error.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      description: skill.description || '',
      display_order: skill.display_order,
    });
    setIconFile(null);
    setIconPreview(skill.icon ? `${config.backendUrl}${skill.icon}` : null);
    setShowForm(true);
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      await api.delete(`/skills/${id}`);
      toast.success('Skill deleted successfully!');
      fetchSkills();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      display_order: 0,
    });
    setIconFile(null);
    setIconPreview(null);
    setEditingId(null);
    setShowForm(false);
  };

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
        <h2 className="text-2xl font-bold gradient-text">Skills Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancel' : 'Add Skill'}
        </motion.button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-6 overflow-hidden"
          >
            <h3 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="input-field"
                    placeholder="e.g., React.js"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">
                    Skill Icon (PNG/JPG/SVG)
                  </label>
                  <div className="flex items-center gap-4">
                    {iconPreview && (
                      <div className="w-16 h-16 rounded-lg border-2 border-dark-300 flex items-center justify-center bg-white p-2">
                        <img
                          src={iconPreview}
                          alt="Icon preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                        onChange={handleIconChange}
                        className="hidden"
                        id="skill-icon"
                      />
                      <label
                        htmlFor="skill-icon"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-dark-200 text-dark-800 rounded-lg cursor-pointer hover:bg-dark-300 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {iconFile ? iconFile.name : 'Choose Icon'}
                      </label>
                      <p className="text-xs text-dark-500 mt-1">
                        Max 2MB, PNG/JPG/SVG preferred
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="input-field resize-none"
                  placeholder="Brief description of your skill..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="input-field"
                  placeholder="0"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1">
                  <Save className="w-4 h-4 inline mr-2" />
                  {editingId ? 'Update Skill' : 'Add Skill'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.length === 0 ? (
          <div className="col-span-full text-center py-12 text-dark-500">
            No skills added yet. Click "Add Skill" to get started.
          </div>
        ) : (
          skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                {skill.icon && (
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg p-1">
                    <img
                      src={skill.icon.startsWith('http') ? skill.icon : `${config.backendUrl}${skill.icon}`}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 hover:bg-dark-200 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-primary-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
              <p className="text-sm text-dark-600 line-clamp-2">
                {skill.description || 'No description'}
              </p>
              <p className="text-xs text-dark-500 mt-2">
                Order: {skill.display_order}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsManagement;

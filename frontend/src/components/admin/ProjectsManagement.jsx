import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { config } from '../../config/credentials.template';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video_link: '',
    display_order: 0,
    skill_ids: [],
    images: [],
    existing_images: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
      ]);
      setProjects(projectsRes.data);
      setSkills(skillsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 20) {
      toast.error('Maximum 20 images allowed per project');
      return;
    }
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description || '');
      data.append('video_link', formData.video_link || '');
      data.append('display_order', formData.display_order);
      data.append('skill_ids', JSON.stringify(formData.skill_ids));

      if (editingId) {
        data.append('existing_images', JSON.stringify(formData.existing_images));
      }

      formData.images.forEach((image) => {
        data.append('images', image);
      });

      if (editingId) {
        await api.put(`/projects/${editingId}`, data);
        toast.success('Project updated successfully!');
      } else {
        await api.post('/projects', data);
        toast.success('Project added successfully!');
      }

      fetchData();
      resetForm();
    } catch (error) {
      console.error('Save project error:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      name: project.name,
      description: project.description || '',
      video_link: project.video_link || '',
      display_order: project.display_order,
      skill_ids: project.skills?.map((s) => s.id) || [],
      images: [],
      existing_images: project.images?.map((img) => img.id) || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      video_link: '',
      display_order: 0,
      skill_ids: [],
      images: [],
      existing_images: [],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleSkill = (skillId) => {
    const newSkills = formData.skill_ids.includes(skillId)
      ? formData.skill_ids.filter((id) => id !== skillId)
      : [...formData.skill_ids, skillId];
    setFormData({ ...formData, skill_ids: newSkills });
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
        <h2 className="text-2xl font-bold gradient-text">Projects Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancel' : 'Add Project'}
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
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="input-field"
                  placeholder="My Awesome Project"
                />
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
                  rows="4"
                  className="input-field resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  YouTube Video Link
                </label>
                <input
                  type="url"
                  value={formData.video_link}
                  onChange={(e) =>
                    setFormData({ ...formData, video_link: e.target.value })
                  }
                  className="input-field"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Project Images (Max 20)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="project-images"
                  />
                  <label
                    htmlFor="project-images"
                    className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-dark-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-dark-500" />
                    <span className="text-dark-600">
                      {formData.images.length > 0
                        ? `${formData.images.length} file(s) selected`
                        : 'Click to upload images'}
                    </span>
                  </label>
                  <p className="text-xs text-dark-500 mt-2">
                    Max 20 images, 10MB each (JPEG, PNG, GIF, WebP)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Technologies Used
                </label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        formData.skill_ids.includes(skill.id)
                          ? 'bg-primary-500 text-white'
                          : 'bg-dark-200 text-dark-700 hover:bg-dark-300'
                      }`}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
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
                  {editingId ? 'Update Project' : 'Add Project'}
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

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-dark-500">
            No projects added yet. Click "Add Project" to get started.
          </div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Project Image/Video */}
              <div className="h-48 bg-dark-200 flex items-center justify-center overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={`${config.backendUrl}${project.images[0].image_url}`}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-16 h-16 text-dark-500" />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-sm text-dark-600 mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Skills */}
                {project.skills && project.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 text-xs bg-primary-500/20 text-primary-600 rounded-full"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 btn-secondary text-sm py-2"
                  >
                    <Edit2 className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsManagement;

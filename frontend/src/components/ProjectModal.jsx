import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageCircle, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { config } from '../config/credentials.template';

const ProjectModal = ({ project, onClose }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    reviewer_name: '',
    reviewer_email: '',
    rating: 5,
    comment: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [project.id]);

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/reviews/project/${project.id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/reviews', {
        ...reviewForm,
        project_id: project.id,
      });
      toast.success('Review submitted! It will be visible after approval.');
      setReviewForm({
        reviewer_name: '',
        reviewer_email: '',
        rating: 5,
        comment: '',
      });
      setShowReviewForm(false);
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 glass-card border-b border-dark-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-800">
              {project.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dark-200 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Video or Images */}
            {project.video_link && (
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(project.video_link)}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.map((img) => (
                  <motion.div
                    key={img.id}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-video rounded-xl overflow-hidden glass-card"
                  >
                    <img
                      src={`${config.backendUrl}${img.image_url}`}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold mb-3">About This Project</h3>
              <p className="text-dark-600 leading-relaxed">{project.description}</p>
            </div>

            {/* Skills */}
            {project.skills && project.skills.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 glass-card text-primary-600 font-medium"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Reviews ({reviews.length})</h3>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="btn-primary text-sm px-4 py-2"
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Write Review
                </button>
              </div>

              {/* Review Form */}
              <AnimatePresence>
                {showReviewForm && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleSubmitReview}
                    className="glass-card p-4 mb-4 space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={reviewForm.reviewer_name}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, reviewer_name: e.target.value })
                        }
                        className="input-field"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={reviewForm.reviewer_email}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, reviewer_email: e.target.value })
                        }
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className="transition-colors"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= reviewForm.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-dark-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      placeholder="Write your review..."
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, comment: e.target.value })
                      }
                      className="input-field min-h-[100px] resize-none"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-center text-dark-500 py-8">
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-dark-800">
                            {review.reviewer_name}
                          </h4>
                          <p className="text-sm text-dark-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-dark-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-dark-600">{review.comment}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;

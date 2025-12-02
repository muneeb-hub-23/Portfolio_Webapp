import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Trash2, Star, Filter } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, approved, pending

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews/admin/all');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, isApproved) => {
    try {
      await api.patch(`/reviews/${id}/approve`, { is_approved: isApproved });
      toast.success(isApproved ? 'Review approved!' : 'Review rejected!');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await api.delete(`/reviews/${id}`);
      toast.success('Review deleted successfully!');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'approved') return review.is_approved;
    if (filter === 'pending') return !review.is_approved;
    return true;
  });

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.is_approved).length,
    pending: reviews.filter((r) => !r.is_approved).length,
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold gradient-text">Reviews Management</h2>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 glass-card p-1 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary-500 text-white'
                : 'text-dark-600 hover:bg-dark-200'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'approved'
                ? 'bg-primary-500 text-white'
                : 'text-dark-600 hover:bg-dark-200'
            }`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'pending'
                ? 'bg-primary-500 text-white'
                : 'text-dark-600 hover:bg-dark-200'
            }`}
          >
            Pending ({stats.pending})
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 text-dark-500 glass-card">
            No reviews found.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card p-6 ${
                !review.is_approved ? 'border-l-4 border-orange-500' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-dark-800">
                        {review.reviewer_name}
                      </h3>
                      {review.reviewer_email && (
                        <p className="text-sm text-dark-500">
                          {review.reviewer_email}
                        </p>
                      )}
                      <p className="text-xs text-dark-500 mt-1">
                        {new Date(review.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
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
                      <span className="text-sm font-semibold text-dark-700">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  <p className="text-dark-600 mb-3">{review.comment}</p>

                  {review.project_name && (
                    <p className="text-sm text-primary-600 font-medium">
                      Project: {review.project_name}
                    </p>
                  )}

                  {review.is_approved ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 mt-2 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 mt-2 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      <XCircle className="w-3 h-3" />
                      Pending Approval
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  {!review.is_approved ? (
                    <button
                      onClick={() => handleApprove(review.id, true)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(review.id, false)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
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

export default ReviewsManagement;

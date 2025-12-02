import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import Dashboard from '../../components/admin/Dashboard';
import ProfileManagement from '../../components/admin/ProfileManagement';
import SkillsManagement from '../../components/admin/SkillsManagement';
import ProjectsManagement from '../../components/admin/ProjectsManagement';
import ReviewsManagement from '../../components/admin/ReviewsManagement';
import EmailJSConfig from '../../components/admin/EmailJSConfig';
import Analytics from '../../components/admin/Analytics';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/skills" element={<SkillsManagement />} />
        <Route path="/projects" element={<ProjectsManagement />} />
        <Route path="/reviews" element={<ReviewsManagement />} />
        <Route path="/emailjs" element={<EmailJSConfig />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;

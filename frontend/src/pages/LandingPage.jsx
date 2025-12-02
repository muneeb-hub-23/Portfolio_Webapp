import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/sections/HeroSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import api from '../utils/api';

const LandingPage = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, skillsRes, projectsRes] = await Promise.all([
        api.get('/profile'),
        api.get('/skills'),
        api.get('/projects'),
      ]);

      setProfile(profileRes.data);
      setSkills(skillsRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection profile={profile} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </div>
  );
};

export default LandingPage;

-- Portfolio Database Schema
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Admin table
CREATE TABLE IF NOT EXISTS admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profile table (single record)
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  picture VARCHAR(500),
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(500),
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  video_link VARCHAR(500),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project images table
CREATE TABLE IF NOT EXISTS project_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project skills (many-to-many relationship)
CREATE TABLE IF NOT EXISTS project_skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  skill_id INT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
  UNIQUE KEY unique_project_skill (project_id, skill_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(255),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- EmailJS configuration table
CREATE TABLE IF NOT EXISTS emailjs_config (
  id INT PRIMARY KEY AUTO_INCREMENT,
  service_id VARCHAR(255) NOT NULL,
  template_id VARCHAR(255) NOT NULL,
  public_key VARCHAR(255) NOT NULL,
  target_email VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin (username: admin, password: admin123 - CHANGE THIS!)
-- Password is hashed using bcrypt
-- Hash for 'admin123' is: $2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO admin (username, password) VALUES 
('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert default profile
INSERT INTO profile (name, description) VALUES 
('Your Name', 'Welcome to my portfolio. I am a passionate developer.');

-- Insert sample EmailJS config (you need to update with your credentials)
INSERT INTO emailjs_config (service_id, template_id, public_key, target_email) VALUES 
('your_service_id', 'your_template_id', 'your_public_key', 'your_email@example.com');

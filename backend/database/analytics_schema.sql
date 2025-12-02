-- Analytics tables for tracking website visitors and page views

-- Page views tracking
CREATE TABLE IF NOT EXISTS page_views (
  id INT PRIMARY KEY AUTO_INCREMENT,
  page_path VARCHAR(255) NOT NULL,
  visitor_ip VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  country VARCHAR(100),
  city VARCHAR(100),
  device_type VARCHAR(50),
  browser VARCHAR(50),
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page_path (page_path),
  INDEX idx_visited_at (visited_at)
);

-- Daily analytics summary
CREATE TABLE IF NOT EXISTS analytics_daily (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE NOT NULL UNIQUE,
  total_visits INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  page_views INT DEFAULT 0,
  avg_time_on_site INT DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_date (date)
);

-- Popular pages tracking
CREATE TABLE IF NOT EXISTS popular_pages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  page_path VARCHAR(255) NOT NULL UNIQUE,
  view_count INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  avg_time INT DEFAULT 0,
  last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_view_count (view_count)
);

-- Visitor sessions
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_id VARCHAR(100) NOT NULL UNIQUE,
  visitor_ip VARCHAR(45),
  first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  pages_viewed INT DEFAULT 0,
  total_time INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  INDEX idx_session_id (session_id),
  INDEX idx_last_activity (last_activity)
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS `social_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `whatsapp` varchar(50) DEFAULT '',
  `linkedin` varchar(255) DEFAULT '',
  `youtube` varchar(255) DEFAULT '',
  `facebook` varchar(255) DEFAULT '',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert default empty social links
INSERT INTO `social_links` (`whatsapp`, `linkedin`, `youtube`, `facebook`) 
VALUES ('', '', '', '')
ON DUPLICATE KEY UPDATE id=id;

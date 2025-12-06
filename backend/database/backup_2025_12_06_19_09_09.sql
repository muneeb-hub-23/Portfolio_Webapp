-- MySQL dump 10.13  Distrib 8.4.6, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: portfolio
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `username`, `password`, `created_at`) VALUES (2,'admin','$2a$10$XHS.6H5X1.kP0np2X1HsWu3iPo5DZLgS2ueKHfOoIfrrIOYX3qmy6','2025-12-02 15:40:46');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analytics_daily`
--

DROP TABLE IF EXISTS `analytics_daily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analytics_daily` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `total_visits` int DEFAULT '0',
  `unique_visitors` int DEFAULT '0',
  `page_views` int DEFAULT '0',
  `avg_time_on_site` int DEFAULT '0',
  `bounce_rate` decimal(5,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`),
  KEY `idx_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analytics_daily`
--

LOCK TABLES `analytics_daily` WRITE;
/*!40000 ALTER TABLE `analytics_daily` DISABLE KEYS */;
/*!40000 ALTER TABLE `analytics_daily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailjs_config`
--

DROP TABLE IF EXISTS `emailjs_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailjs_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_id` varchar(255) NOT NULL,
  `template_id` varchar(255) NOT NULL,
  `public_key` varchar(255) NOT NULL,
  `target_email` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailjs_config`
--

LOCK TABLES `emailjs_config` WRITE;
/*!40000 ALTER TABLE `emailjs_config` DISABLE KEYS */;
INSERT INTO `emailjs_config` (`id`, `service_id`, `template_id`, `public_key`, `target_email`, `updated_at`) VALUES (1,'your_service_id','your_template_id','your_public_key','your_email@example.com','2025-12-02 15:38:49'),(2,'service_5oeleyx','template_lx95iek','5flHnCwygahE-5P2V','muneebbaigwork@gmail.com','2025-12-02 17:38:24');
/*!40000 ALTER TABLE `emailjs_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_views`
--

DROP TABLE IF EXISTS `page_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_path` varchar(255) NOT NULL,
  `visitor_ip` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `referrer` varchar(500) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `device_type` varchar(50) DEFAULT NULL,
  `browser` varchar(50) DEFAULT NULL,
  `visited_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_page_path` (`page_path`),
  KEY `idx_visited_at` (`visited_at`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_views`
--

LOCK TABLES `page_views` WRITE;
/*!40000 ALTER TABLE `page_views` DISABLE KEYS */;
INSERT INTO `page_views` (`id`, `page_path`, `visitor_ip`, `user_agent`, `referrer`, `country`, `city`, `device_type`, `browser`, `visited_at`) VALUES (1,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:16:57'),(2,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:16:57'),(3,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:25:48'),(4,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:25:48'),(5,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:26:12'),(6,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:26:12'),(7,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:33:18'),(8,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:33:18'),(9,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:34:41'),(10,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:34:41'),(11,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:34:49'),(12,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:34:50'),(13,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:35:01'),(14,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:35:01'),(15,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:46:15'),(16,'/','::1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:46:15'),(17,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:49:35'),(18,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-02 17:49:35'),(19,'/','::ffff:192.168.1.12','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-02 17:49:35'),(20,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:55:55'),(21,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:55:55'),(22,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:55:55'),(23,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:55:55'),(24,'/','::ffff:192.168.1.12','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','http://192.168.1.13:3000/',NULL,NULL,'Mobile','Chrome','2025-12-02 17:56:16'),(25,'/','::ffff:192.168.1.12','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','http://192.168.1.13:3000/',NULL,NULL,'Mobile','Chrome','2025-12-02 17:56:16'),(26,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:57:30'),(27,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:57:30'),(28,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:58:44'),(29,'/','::ffff:192.168.1.13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','http://localhost:3000/',NULL,NULL,'Desktop','Chrome','2025-12-02 17:58:44'),(30,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 17:34:29'),(31,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 17:34:29'),(32,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 17:35:48'),(33,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 17:36:59'),(34,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 17:37:46'),(35,'/','10.10.5.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 17:40:00'),(36,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:01:09'),(37,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:02:10'),(38,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:05:14'),(39,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:08:43'),(40,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:20:31'),(41,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:23:30'),(42,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:25:11'),(43,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:26:06'),(44,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:26:16'),(45,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:27:45'),(46,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 18:56:55'),(47,'/',NULL,'Mozilla/5.0 (Linux; Android 11; CPH2269 Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/142.0.7444.102 Mobile Safari/537.36','http://174.82.82.1/',NULL,NULL,'Mobile','Chrome','2025-12-04 19:48:00'),(48,'/',NULL,'Mozilla/5.0 (Linux; Android 11; CPH2269 Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/142.0.7444.102 Mobile Safari/537.36','http://174.82.82.1/',NULL,NULL,'Mobile','Chrome','2025-12-04 19:48:24'),(49,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 OPR/124.0.0.0','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 20:32:49'),(50,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 OPR/124.0.0.0','http://10.10.5.1/authentication/login',NULL,NULL,'Desktop','Chrome','2025-12-04 22:32:34'),(51,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 OPR/124.0.0.0','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 22:33:07'),(52,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-04 23:03:05'),(53,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 OPR/124.0.0.0','http://10.10.5.1/authentication/login',NULL,NULL,'Desktop','Chrome','2025-12-05 16:58:14'),(54,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 17:34:02'),(55,'/',NULL,'Mozilla/5.0 (Linux; Android 11; CPH2269 Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/142.0.7444.102 Mobile Safari/537.36','http://174.82.82.1/',NULL,NULL,'Mobile','Chrome','2025-12-05 17:59:40'),(56,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 18:14:19'),(57,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 18:41:30'),(58,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 18:41:37'),(59,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:00:58'),(60,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:02:59'),(61,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:18:43'),(62,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:20:35'),(63,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-05 19:21:13'),(64,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:33:02'),(65,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:35:36'),(66,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:35:37'),(67,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:38:25'),(68,'/',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148','direct',NULL,NULL,'Mobile','Other','2025-12-05 19:38:25'),(69,'/',NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 19:56:38'),(70,'/',NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 20:41:03'),(71,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 20:45:18'),(72,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-05 22:02:51'),(73,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 22:48:34'),(74,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 22:50:03'),(75,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 22:52:57'),(76,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 22:53:56'),(77,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 22:54:53'),(78,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 22:57:36'),(79,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 22:58:06'),(80,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-05 23:01:29'),(81,'/',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.156 Mobile/15E148 Safari/604.1','direct',NULL,NULL,'Mobile','Safari','2025-12-05 23:30:55'),(82,'/',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.156 Mobile/15E148 Safari/604.1','direct',NULL,NULL,'Mobile','Safari','2025-12-05 23:30:55'),(83,'/',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.156 Mobile/15E148 Safari/604.1','direct',NULL,NULL,'Mobile','Safari','2025-12-05 23:30:55'),(84,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.7390.37 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 00:34:06'),(85,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 00:34:20'),(86,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 00:35:49'),(87,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 00:36:28'),(88,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 00:37:20'),(89,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 00:40:07'),(90,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 00:41:27'),(91,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 00:42:11'),(92,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 00:42:27'),(93,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 00:47:14'),(94,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 00:58:56'),(95,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:00:29'),(96,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:10:15'),(97,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:10:38'),(98,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:13:20'),(99,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:15:35'),(100,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 01:17:30'),(101,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:24:26'),(102,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:29:00'),(103,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:35:38'),(104,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:47:14'),(105,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 01:49:42'),(106,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 02:00:57'),(107,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 02:03:44'),(108,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 02:05:12'),(109,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 02:25:39'),(110,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 02:30:08'),(111,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 02:30:25'),(112,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 02:41:16'),(113,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 02:42:48'),(114,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 02:43:46'),(115,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 03:25:27'),(116,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 04:06:23'),(117,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 04:24:48'),(118,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 04:41:07'),(119,'/',NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 05:03:57'),(120,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19582','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 05:04:01'),(121,'/',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1','direct',NULL,NULL,'Mobile','Safari','2025-12-06 05:04:15'),(122,'/',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1','direct',NULL,NULL,'Mobile','Safari','2025-12-06 05:04:22'),(123,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 05:12:19'),(124,'/',NULL,'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 05:26:40'),(125,'/',NULL,'Mozilla/5.0 (Linux; arm_64; Android 15; 23124RA7EO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.7339.110 YaBrowser/25.10.4.110.00 SA/3 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 05:34:49'),(126,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 07:49:22'),(127,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','https://www.linkedin.com/',NULL,NULL,'Desktop','Chrome','2025-12-06 08:21:41'),(128,'/',NULL,'Mozilla/5.0 (Linux; Android 13; TECNO KI7 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/142.0.7444.171 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 09:10:10'),(129,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 09:32:51'),(130,'/',NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 10:10:44'),(131,'/',NULL,'Mozilla/5.0 (X11; CrOS armv7l 13597.84.0) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/88.0.4324.187 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 12:42:53'),(132,'/',NULL,'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.7390.122 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 12:57:04'),(133,'/',NULL,'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.7390.122 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 14:24:31'),(134,'/',NULL,'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.7390.122 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 14:24:51'),(135,'/',NULL,'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/141.0.7390.122 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 14:24:52'),(136,'/',NULL,'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.7390.122 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 14:24:52'),(137,'/',NULL,'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/141.0.7390.122 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 14:24:54'),(138,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 14:41:22'),(139,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 14:43:42'),(140,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0','direct',NULL,NULL,'Desktop','Firefox','2025-12-06 15:30:38'),(141,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 19:43:17'),(142,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 19:52:46'),(143,'/',NULL,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.3','direct',NULL,NULL,'Desktop','Chrome','2025-12-06 20:41:13'),(144,'/',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.1 Mobile/15E148 Safari/604.1','direct',NULL,NULL,'Mobile','Safari','2025-12-06 20:58:04'),(145,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-06 23:56:14'),(146,'/',NULL,'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36','direct',NULL,NULL,'Mobile','Chrome','2025-12-07 00:05:18'),(147,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36','https://www.linkedin.com/',NULL,NULL,'Desktop','Chrome','2025-12-07 00:40:47');
/*!40000 ALTER TABLE `page_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popular_pages`
--

DROP TABLE IF EXISTS `popular_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popular_pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_path` varchar(255) NOT NULL,
  `view_count` int DEFAULT '0',
  `unique_visitors` int DEFAULT '0',
  `avg_time` int DEFAULT '0',
  `last_viewed` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_path` (`page_path`),
  KEY `idx_view_count` (`view_count`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popular_pages`
--

LOCK TABLES `popular_pages` WRITE;
/*!40000 ALTER TABLE `popular_pages` DISABLE KEYS */;
INSERT INTO `popular_pages` (`id`, `page_path`, `view_count`, `unique_visitors`, `avg_time`, `last_viewed`) VALUES (1,'/',147,1,0,'2025-12-07 00:40:47');
/*!40000 ALTER TABLE `popular_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `picture` varchar(500) DEFAULT NULL,
  `description` text,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` (`id`, `name`, `picture`, `description`, `updated_at`) VALUES (1,'Your Name',NULL,'Welcome to my portfolio. I am a passionate developer.','2025-12-02 15:38:49'),(2,'Muneeb Baig','/uploads/profile/1764869858071.png','I am a Full Stack Developer Who Design, Build and Deploy Enterprise Class Software Solutions, Highly Customized and with Detailed Reports','2025-12-05 19:20:32');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_images_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
INSERT INTO `project_images` (`id`, `project_id`, `image_url`, `display_order`) VALUES (1,1,'/uploads/projects/1764695384422-335153491.png',0),(2,1,'/uploads/projects/1764695384438-107410246.png',1),(3,1,'/uploads/projects/1764695384446-740318769.png',2),(4,1,'/uploads/projects/1764695384451-271281706.png',3),(5,1,'/uploads/projects/1764695384456-456860846.png',4),(6,1,'/uploads/projects/1764695384459-129083999.png',5),(7,1,'/uploads/projects/1764695384464-714868294.png',6),(8,1,'/uploads/projects/1764695384470-853472268.png',7),(9,1,'/uploads/projects/1764695384477-594608898.png',8),(10,1,'/uploads/projects/1764695384482-44716273.png',9),(11,1,'/uploads/projects/1764695384495-90258302.png',10),(12,1,'/uploads/projects/1764695384499-608540002.png',11),(13,1,'/uploads/projects/1764695384504-379766098.png',12),(14,1,'/uploads/projects/1764695384511-669930615.png',13),(15,1,'/uploads/projects/1764695384518-335914448.png',14),(16,2,'/uploads/projects/1764695749254-839200912.png',0),(17,2,'/uploads/projects/1764695749257-688938800.png',1),(18,2,'/uploads/projects/1764695749261-568967696.png',2),(19,2,'/uploads/projects/1764695749264-542787870.png',3),(20,2,'/uploads/projects/1764695749269-719236688.png',4),(21,2,'/uploads/projects/1764695749271-174553170.png',5),(22,2,'/uploads/projects/1764695749276-902532393.png',6),(23,2,'/uploads/projects/1764695749284-739300783.png',7),(24,2,'/uploads/projects/1764695749286-541795828.png',8),(25,2,'/uploads/projects/1764695749288-79624550.png',9),(26,2,'/uploads/projects/1764695749291-922266894.png',10),(27,2,'/uploads/projects/1764695749294-580343416.png',11),(28,2,'/uploads/projects/1764695749294-817325313.png',12),(29,2,'/uploads/projects/1764695749297-955259048.png',13),(30,2,'/uploads/projects/1764695749301-522408918.png',14),(31,2,'/uploads/projects/1764695749308-587280620.png',15),(32,2,'/uploads/projects/1764695749310-629590595.png',16),(33,2,'/uploads/projects/1764695749313-641336510.png',17),(34,2,'/uploads/projects/1764695749320-66809664.png',18),(35,2,'/uploads/projects/1764695749325-5822027.png',19),(36,3,'/uploads/projects/1764961232142-975391813.PNG',0),(37,3,'/uploads/projects/1764961232165-74142979.PNG',1),(38,3,'/uploads/projects/1764961232180-709797427.PNG',2),(39,3,'/uploads/projects/1764961232218-870236930.PNG',3),(40,3,'/uploads/projects/1764961232557-975305030.PNG',4),(41,3,'/uploads/projects/1764961232573-208805093.PNG',5),(42,3,'/uploads/projects/1764961232615-188817023.PNG',6),(43,3,'/uploads/projects/1764961232654-175097843.PNG',7),(44,3,'/uploads/projects/1764961232723-137476712.PNG',8),(45,3,'/uploads/projects/1764961232768-767036294.PNG',9),(46,3,'/uploads/projects/1764961232811-111561654.PNG',10),(47,3,'/uploads/projects/1764961232860-168902988.PNG',11),(48,3,'/uploads/projects/1764961233191-50650743.PNG',12),(49,3,'/uploads/projects/1764961233253-990765793.PNG',13),(50,3,'/uploads/projects/1764961233296-630611457.PNG',14),(51,3,'/uploads/projects/1764961233348-679378622.PNG',15),(52,4,'/uploads/projects/1764962316727-284516366.PNG',0),(53,4,'/uploads/projects/1764962316746-323756423.PNG',1),(54,4,'/uploads/projects/1764962316795-764646870.PNG',2),(55,4,'/uploads/projects/1764962317145-420622466.PNG',3),(56,4,'/uploads/projects/1764962317164-801621246.PNG',4),(57,4,'/uploads/projects/1764962317176-912077226.PNG',5),(58,4,'/uploads/projects/1764962317190-236951005.PNG',6),(59,4,'/uploads/projects/1764962317199-938864606.PNG',7),(60,4,'/uploads/projects/1764962317205-805780531.png',8),(61,4,'/uploads/projects/1764962317215-919806580.PNG',9),(62,4,'/uploads/projects/1764962317241-596620052.PNG',10),(63,4,'/uploads/projects/1764962317251-387472876.PNG',11),(64,4,'/uploads/projects/1764962317262-301833119.PNG',12),(65,4,'/uploads/projects/1764962317277-220745693.PNG',13),(66,4,'/uploads/projects/1764962317287-482148773.PNG',14),(67,4,'/uploads/projects/1764962317299-943536722.PNG',15),(68,4,'/uploads/projects/1764962317303-10907475.PNG',16),(69,4,'/uploads/projects/1764962317331-72824941.PNG',17),(70,4,'/uploads/projects/1764962317667-517095039.PNG',18),(71,4,'/uploads/projects/1764962317668-804392023.PNG',19);
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_skills`
--

DROP TABLE IF EXISTS `project_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_project_skill` (`project_id`,`skill_id`),
  KEY `skill_id` (`skill_id`),
  CONSTRAINT `project_skills_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_skills`
--

LOCK TABLES `project_skills` WRITE;
/*!40000 ALTER TABLE `project_skills` DISABLE KEYS */;
INSERT INTO `project_skills` (`id`, `project_id`, `skill_id`) VALUES (26,1,1),(27,1,2),(28,1,3),(29,1,4),(30,1,5),(31,1,6),(20,2,1),(21,2,2),(22,2,3),(23,2,4),(24,2,5),(25,2,6),(16,3,1),(15,3,2),(17,3,4),(18,3,5),(19,3,6),(32,4,1),(33,4,2),(34,4,4),(35,4,5),(36,4,6);
/*!40000 ALTER TABLE `project_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `video_link` varchar(500) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` (`id`, `name`, `description`, `video_link`, `display_order`, `created_at`) VALUES (1,'Students Attendance Management System','This was my final year project in CTTI college and it is completely ready to use attendance system for students level with advanced reports','https://www.youtube.com/watch?v=pwuVqrSc0uw',0,'2025-12-02 17:09:44'),(2,'Cyber POS | Point of Sale System','This is a point of sale system to handle multiple shops data and ledger management, handling customers and suppliers ledgers and products stock, detailed reports.','',0,'2025-12-02 17:15:49'),(3,'ISP Billing & Realtime User Tracking System','This system is build to completely track internet service provider data like ppp user billing, sessions, data usage and actively troubleshooting','',0,'2025-12-05 19:00:33'),(4,'Hospital Management Information System','I built this system for Dental College HITEC-IMS for managing patients and payments data efficiently with seamless connectivity and enterprise class features and reporting','',0,'2025-12-05 19:18:37');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `reviewer_name` varchar(255) NOT NULL,
  `reviewer_email` varchar(255) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `comment` text,
  `is_approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `icon` varchar(500) DEFAULT NULL,
  `description` text,
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` (`id`, `name`, `icon`, `description`, `display_order`, `created_at`) VALUES (1,'React JS','/uploads/skills/1764693291082-png-transparent-react-hd-logo.png','',0,'2025-12-02 15:48:06'),(2,'Next JS','/uploads/skills/1764693351489-next-js-logo-png_seeklogo-394608.png','',0,'2025-12-02 16:35:51'),(3,'Mongo DB','/uploads/skills/1764693710868-mongodb.svg','',0,'2025-12-02 16:39:05'),(4,'MySQL','/uploads/skills/1764694434706-images-removebg-preview.png','',0,'2025-12-02 16:53:54'),(5,'Javascript','/uploads/skills/1764694562143-js-javascript-round-logo-icon-png-7017516947717339mnyf7eumy-removebg-preview.png','',0,'2025-12-02 16:56:02'),(6,'HTML','/uploads/skills/1764694613933-Other-html-5-icon.png','',0,'2025-12-02 16:56:53'),(7,'IIS','/uploads/skills/1764975234108-iis-Logo.png','',0,'2025-12-05 22:49:36'),(8,'Vite','/uploads/skills/1764975169187-vite.svg','',0,'2025-12-05 22:52:49'),(9,'Databases','/uploads/skills/1764975290720-9850812.png','',0,'2025-12-05 22:54:50'),(10,'EJS','/uploads/skills/1764975352792-ejs.png','',0,'2025-12-05 22:55:52'),(11,'Batch Scripting','/uploads/skills/1764975453394-3bb533b4-e007-442b-9a69-1dedc9fd3708_removalai_preview.png','',0,'2025-12-05 22:57:33');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_sessions`
--

DROP TABLE IF EXISTS `visitor_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitor_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(100) NOT NULL,
  `visitor_ip` varchar(45) DEFAULT NULL,
  `first_visit` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pages_viewed` int DEFAULT '0',
  `total_time` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_id` (`session_id`),
  KEY `idx_session_id` (`session_id`),
  KEY `idx_last_activity` (`last_activity`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_sessions`
--

LOCK TABLES `visitor_sessions` WRITE;
/*!40000 ALTER TABLE `visitor_sessions` DISABLE KEYS */;
INSERT INTO `visitor_sessions` (`id`, `session_id`, `visitor_ip`, `first_visit`, `last_activity`, `pages_viewed`, `total_time`, `is_active`) VALUES (1,'1764695817573-ovsexqrbn','::1','2025-12-02 17:16:57','2025-12-02 17:25:48',4,0,1),(5,'1764696372716-h74s0d5an','::1','2025-12-02 17:26:12','2025-12-02 17:26:12',2,0,1),(7,'1764696798822-ngd1gm6gn','::1','2025-12-02 17:33:18','2025-12-02 17:58:44',15,0,1),(15,'1764697575044-fins3xger','::1','2025-12-02 17:46:15','2025-12-02 17:55:55',5,0,1),(19,'1764697658563-33qgjjfg8','::ffff:192.168.1.12','2025-12-02 17:49:35','2025-12-02 17:56:16',3,0,1),(30,'1764869327208-djdjyzi7r',NULL,'2025-12-04 17:34:29','2025-12-04 17:34:29',2,0,1),(32,'1764869748326-39v6byf6s',NULL,'2025-12-04 17:35:48','2025-12-04 18:01:09',5,0,1),(37,'1764871330371-pgfxb5kyl',NULL,'2025-12-04 18:02:10','2025-12-04 18:05:14',2,0,1),(39,'1764871723424-jmdggsp3n',NULL,'2025-12-04 18:08:43','2025-12-04 18:08:43',1,0,1),(40,'1764872431812-7wbi1vo3p',NULL,'2025-12-04 18:20:32','2025-12-04 18:25:11',2,0,1),(41,'1764872610030-bjpd8ywv8',NULL,'2025-12-04 18:23:30','2025-12-04 18:23:30',1,0,1),(43,'1764825868408-5omgu5bnm',NULL,'2025-12-04 18:26:06','2025-12-04 18:26:06',1,0,1),(44,'1764825926150-zc9nvi783',NULL,'2025-12-04 18:26:17','2025-12-04 18:26:17',1,0,1),(45,'1764826015059-0kojg8at1',NULL,'2025-12-04 18:27:45','2025-12-04 18:27:45',1,0,1),(46,'1764827764188-a9se48jl2',NULL,'2025-12-04 18:56:56','2025-12-04 18:56:56',1,0,1),(47,'1764830853502-qjsp2y7pp',NULL,'2025-12-04 19:48:00','2025-12-04 19:48:00',1,0,1),(48,'1764830878499-pmd5rkd7v',NULL,'2025-12-04 19:48:24','2025-12-04 19:48:24',1,0,1),(49,'1764833538338-fhleazoxz',NULL,'2025-12-04 20:32:50','2025-12-04 20:32:50',1,0,1),(50,'1764840728318-kd8667jzb',NULL,'2025-12-04 22:32:34','2025-12-05 16:58:14',2,0,1),(51,'1764840761845-ddgrxqral',NULL,'2025-12-04 22:33:08','2025-12-04 22:33:08',1,0,1),(52,'1764842559045-gno5e5w4o',NULL,'2025-12-04 23:03:05','2025-12-04 23:03:05',1,0,1),(54,'1764909189570-rz5q0miap',NULL,'2025-12-05 17:34:02','2025-12-05 18:41:30',3,0,1),(55,'1764910751645-7pu6k53yy',NULL,'2025-12-05 17:59:40','2025-12-05 17:59:40',1,0,1),(58,'1764913244994-7gw3lqcc3',NULL,'2025-12-05 18:41:37','2025-12-05 18:41:37',1,0,1),(59,'1764914406420-uwvj2f3hf',NULL,'2025-12-05 19:00:58','2025-12-05 22:50:03',8,0,1),(63,'1764915645918-wnpe5ywzq',NULL,'2025-12-05 19:21:13','2025-12-05 19:21:13',1,0,1),(65,'1764916508748-pir22wil6',NULL,'2025-12-05 19:35:36','2025-12-05 19:35:36',1,0,1),(66,'1764916509555-rcptd4l0a',NULL,'2025-12-05 19:35:37','2025-12-05 19:35:37',1,0,1),(67,'1764916677442-1fry5eyvk',NULL,'2025-12-05 19:38:25','2025-12-05 19:38:25',1,0,1),(68,'1764916677801-abdvhnhq1',NULL,'2025-12-05 19:38:25','2025-12-05 19:38:25',1,0,1),(69,'1764917771099-2ut1g2lji',NULL,'2025-12-05 19:56:39','2025-12-05 19:56:39',1,0,1),(70,'1764920435114-vd4kr0y5m',NULL,'2025-12-05 20:41:03','2025-12-05 20:41:03',1,0,1),(72,'1764925343865-58v4i3j8w',NULL,'2025-12-05 22:02:51','2025-12-05 22:02:51',1,0,1),(75,'1764928326126-wg2oqlywg',NULL,'2025-12-05 22:52:57','2025-12-05 22:57:36',4,0,1),(79,'1764928659056-vooyxqk3x',NULL,'2025-12-05 22:58:06','2025-12-05 22:58:06',1,0,1),(80,'1764928837750-75rzwom6k',NULL,'2025-12-05 23:01:29','2025-12-05 23:01:29',1,0,1),(81,'1764930624433-4iamrglbm',NULL,'2025-12-05 23:30:55','2025-12-05 23:30:55',1,0,1),(82,'1764930624779-vb2fyasv5',NULL,'2025-12-05 23:30:56','2025-12-05 23:30:56',1,0,1),(83,'1764930627320-uvpht50sd',NULL,'2025-12-05 23:30:56','2025-12-05 23:30:56',1,0,1),(84,'1764934418354-p2hnhawcu',NULL,'2025-12-06 00:34:06','2025-12-06 00:34:06',1,0,1),(85,'1764934432184-2g1xj8242',NULL,'2025-12-06 00:34:20','2025-12-06 00:34:20',1,0,1),(86,'1764934520783-j7co1mybd',NULL,'2025-12-06 00:35:49','2025-12-06 00:35:49',1,0,1),(87,'1764934560809-qrsindm4c',NULL,'2025-12-06 00:36:29','2025-12-06 00:36:29',1,0,1),(88,'1764934612297-ydqurcznm',NULL,'2025-12-06 00:37:20','2025-12-06 00:37:20',1,0,1),(89,'1764934782349-ju7a1w9b9',NULL,'2025-12-06 00:40:08','2025-12-06 00:40:08',1,0,1),(90,'1764934862397-2fdi47iss',NULL,'2025-12-06 00:41:28','2025-12-06 00:41:28',1,0,1),(91,'1764934902942-oyn7v05aq',NULL,'2025-12-06 00:42:11','2025-12-06 00:42:11',1,0,1),(92,'1764934917769-uyp3yepuw',NULL,'2025-12-06 00:42:28','2025-12-06 00:42:28',1,0,1),(93,'1764935205385-htdsaw2sp',NULL,'2025-12-06 00:47:14','2025-12-06 00:47:14',1,0,1),(94,'1764935908337-la9l3byfy',NULL,'2025-12-06 00:58:56','2025-12-06 00:58:56',1,0,1),(95,'1764936000717-yd69r5py9',NULL,'2025-12-06 01:00:29','2025-12-06 01:00:29',1,0,1),(96,'1764936586051-je4uepddp',NULL,'2025-12-06 01:10:15','2025-12-06 01:10:15',1,0,1),(97,'1764936608235-5q3yxft2g',NULL,'2025-12-06 01:10:38','2025-12-06 01:10:38',1,0,1),(98,'1764936771134-vdilntizj',NULL,'2025-12-06 01:13:20','2025-12-06 01:13:20',1,0,1),(99,'1764936899961-7qnq76y47',NULL,'2025-12-06 01:15:35','2025-12-06 01:17:30',2,0,1),(101,'1764937438266-aihz0n585',NULL,'2025-12-06 01:24:26','2025-12-06 01:24:26',1,0,1),(102,'1764937746684-14zv1yyws',NULL,'2025-12-06 01:29:00','2025-12-06 01:29:00',1,0,1),(103,'1764938109588-tcjes2ws4',NULL,'2025-12-06 01:35:38','2025-12-06 01:35:38',1,0,1),(104,'1764938806735-zl8o8hmws',NULL,'2025-12-06 01:47:14','2025-12-06 01:47:14',1,0,1),(105,'1764938953336-ezlpyz1ms',NULL,'2025-12-06 01:49:42','2025-12-06 01:49:42',1,0,1),(106,'1764939631074-57cem2dl2',NULL,'2025-12-06 02:00:57','2025-12-06 02:00:57',1,0,1),(107,'1764939798525-bb5zubheu',NULL,'2025-12-06 02:03:45','2025-12-06 02:03:45',1,0,1),(108,'1764939886354-oaedgou6e',NULL,'2025-12-06 02:05:12','2025-12-06 02:05:12',1,0,1),(109,'1764941110508-6ip94r48d',NULL,'2025-12-06 02:25:39','2025-12-06 02:25:39',1,0,1),(110,'1764941380695-rscdvoj9a',NULL,'2025-12-06 02:30:08','2025-12-06 02:30:08',1,0,1),(111,'1764941398466-jdvxvdltu',NULL,'2025-12-06 02:30:26','2025-12-06 02:30:26',1,0,1),(112,'1764942048432-y7kudhkq5',NULL,'2025-12-06 02:41:16','2025-12-06 02:41:16',1,0,1),(113,'1764942140668-0p0vqtnyb',NULL,'2025-12-06 02:42:48','2025-12-06 02:42:48',1,0,1),(114,'1764942197615-9qiqogdj4',NULL,'2025-12-06 02:43:46','2025-12-06 02:43:46',1,0,1),(115,'1764944698662-ak5trfz3o',NULL,'2025-12-06 03:25:27','2025-12-06 03:25:27',1,0,1),(116,'1764947153799-xwed6qg23',NULL,'2025-12-06 04:06:23','2025-12-06 04:24:48',2,0,1),(118,'1764949240172-r9qc4nag8',NULL,'2025-12-06 04:41:07','2025-12-06 04:41:07',1,0,1),(119,'1764950608807-00bymahfd',NULL,'2025-12-06 05:03:57','2025-12-06 05:03:57',1,0,1),(120,'1764950613038-2dlqy8l7z',NULL,'2025-12-06 05:04:01','2025-12-06 05:04:01',1,0,1),(121,'1764950627341-4546qvhvx',NULL,'2025-12-06 05:04:15','2025-12-06 05:04:15',1,0,1),(122,'1764950634551-nbwws70co',NULL,'2025-12-06 05:04:22','2025-12-06 05:04:22',1,0,1),(123,'1764950955350-t0pje1ju6',NULL,'2025-12-06 05:12:19','2025-12-06 05:12:19',1,0,1),(124,'1764951972726-a0cqpqvui',NULL,'2025-12-06 05:26:40','2025-12-06 05:26:40',1,0,1),(125,'1764952459697-alrboa4g9',NULL,'2025-12-06 05:34:49','2025-12-06 05:34:49',1,0,1),(126,'1764960534681-lzuf1i51f',NULL,'2025-12-06 07:49:22','2025-12-06 07:49:22',1,0,1),(127,'1764962495797-zqzfz3ngr',NULL,'2025-12-06 08:21:42','2025-12-07 00:40:47',2,0,1),(128,'1764965382115-oubau60d6',NULL,'2025-12-06 09:10:10','2025-12-06 09:10:10',1,0,1),(129,'1764966746438-7twakrfo6',NULL,'2025-12-06 09:32:51','2025-12-06 09:32:51',1,0,1),(130,'1764969016787-edfta1s2n',NULL,'2025-12-06 10:10:44','2025-12-06 10:10:44',1,0,1),(131,'1764978145824-9p136qb9k',NULL,'2025-12-06 12:42:53','2025-12-06 12:42:53',1,0,1),(132,'1764892800014-e60lxa8p0',NULL,'2025-12-06 12:57:04','2025-12-06 12:57:04',1,0,1),(133,'1764979200014-e60lxa8p0',NULL,'2025-12-06 14:24:31','2025-12-06 14:24:31',1,0,1),(134,'1764984263949-e60lxa8p0',NULL,'2025-12-06 14:24:51','2025-12-06 14:24:51',1,0,1),(135,'1764984263953-e60lxa8p0',NULL,'2025-12-06 14:24:52','2025-12-06 14:24:52',1,0,1),(136,'1764984266278-e60lxa8p0',NULL,'2025-12-06 14:24:53','2025-12-06 14:24:53',1,0,1),(137,'1764984264950-e60lxa8p0',NULL,'2025-12-06 14:24:54','2025-12-06 14:24:54',1,0,1),(138,'1764985255262-ctzak3lms',NULL,'2025-12-06 14:41:22','2025-12-06 14:41:22',1,0,1),(139,'1764985395942-pxd2qihsy',NULL,'2025-12-06 14:43:42','2025-12-06 14:43:42',1,0,1),(140,'1764988210471-3sp8h0xve',NULL,'2025-12-06 15:30:38','2025-12-06 15:30:38',1,0,1),(141,'1765003369915-26wly56gi',NULL,'2025-12-06 19:43:17','2025-12-06 19:43:17',1,0,1),(142,'1765003939675-e2zjk2pbs',NULL,'2025-12-06 19:52:46','2025-12-06 19:52:46',1,0,1),(143,'1765006846408-w26j5a59l',NULL,'2025-12-06 20:41:13','2025-12-06 20:41:13',1,0,1),(144,'1765007859418-415ud75eu',NULL,'2025-12-06 20:58:05','2025-12-06 20:58:05',1,0,1),(145,'1765018547628-8f4ifus5k',NULL,'2025-12-06 23:56:14','2025-12-06 23:56:14',1,0,1),(146,'1765019092227-lfl7yhgxz',NULL,'2025-12-07 00:05:18','2025-12-07 00:05:18',1,0,1);
/*!40000 ALTER TABLE `visitor_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'portfolio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-06 19:09:09

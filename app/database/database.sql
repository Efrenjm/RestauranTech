CREATE DATABASE IF NOT EXISTS `restaurantech`;

CREATE USER IF NOT EXISTS 'test'@'localhost' IDENTIFIED BY 'pwd';

USE `restaurantech`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(128) NOT NULL,
    `email` varchar(128) NOT NULL UNIQUE,
    `password` varchar(128) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON restaurantech.* TO 'test'@'localhost';
FLUSH PRIVILEGES;
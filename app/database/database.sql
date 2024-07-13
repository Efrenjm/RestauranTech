CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(128) NOT NULL,
    `email` varchar(128) NOT NULL UNIQUE,
    `password` varchar(128) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
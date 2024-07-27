USE `RestauranTech`;

CREATE TABLE IF NOT EXISTS `user` (
    `user_id` INT AUTO_INCREMENT,
    `company_id` INT,
    `name` VARCHAR(128) NOT NULL,
    `email` VARCHAR(128) NOT NULL UNIQUE,
    `password` VARCHAR(128) NOT NULL,
    `profile_picture` VARCHAR(2048) NOT NULL,
    PRIMARY KEY (`user_id`),
    FOREIGN KEY (`company_id`) REFERENCES `company`(`company_id`)
);
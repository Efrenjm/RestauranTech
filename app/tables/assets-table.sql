USE `RestauranTech`;

CREATE TABLE IF NOT EXISTS `assets` (
    `asset_id` INT NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `description` VARCHAR(512) NOT NULL,
    `picture` VARCHAR(2048) NOT NULL,
    PRIMARY KEY (`asset_id`)
);
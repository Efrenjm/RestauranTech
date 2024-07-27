USE `RestauranTech`;

CREATE TABLE IF NOT EXISTS `order_details` (
    `order_id` INT NOT NULL,
    `asset_id` INT NOT NULL,
    `footprint_id` INT NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `final_price` DOUBLE NOT NULL,
    PRIMARY KEY (`order_id`, `asset_id`, `footprint_id`),
    FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`),
    FOREIGN KEY (`asset_id`) REFERENCES `assets`(`asset_id`),
    FOREIGN KEY (`footprint_id`) REFERENCES `footprint`(`footprint_id`)
);
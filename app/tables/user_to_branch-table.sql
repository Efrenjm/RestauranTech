USE `RestauranTech`;

CREATE TABLE IF NOT EXISTS `user_to_branch` (
    `user_id` INT NOT NULL,
    `branch_id` INT NOT NULL,
    `role_id` INT NOT NULL,
    PRIMARY KEY (`user_id`, `branch_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`branch_id`) REFERENCES `branch`(`branch_id`),
    FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`)
);
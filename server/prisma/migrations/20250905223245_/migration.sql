/*
  Warnings:

  - You are about to drop the column `added_to_cart` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `added_to_wishlist` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `added_to_cart`,
    DROP COLUMN `added_to_wishlist`,
    DROP COLUMN `views`;

-- CreateTable
CREATE TABLE `product_analytics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NULL,
    `user_agent` VARCHAR(191) NULL,
    `referrer` VARCHAR(191) NULL,
    `ip_address` VARCHAR(191) NULL,
    `session_id` VARCHAR(191) NULL,
    `user_id` INTEGER NULL,
    `metadata` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `product_analytics_product_id_idx`(`product_id`),
    INDEX `product_analytics_action_idx`(`action`),
    INDEX `product_analytics_created_at_idx`(`created_at`),
    INDEX `product_analytics_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_analytics` ADD CONSTRAINT `product_analytics_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_analytics` ADD CONSTRAINT `product_analytics_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

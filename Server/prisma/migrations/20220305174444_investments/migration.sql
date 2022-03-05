-- CreateTable
CREATE TABLE `Investments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `note` TEXT NOT NULL,
    `type` VARCHAR(25) NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Investments_id_key`(`id`),
    INDEX `Investments_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Investments` ADD CONSTRAINT `Investments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

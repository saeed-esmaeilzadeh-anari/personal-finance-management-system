-- CreateTable
CREATE TABLE `FinanceReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25) NOT NULL,
    `note` TEXT NOT NULL,
    `type` VARCHAR(25) NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `incomeId` INTEGER NOT NULL,
    `expenseId` INTEGER NOT NULL,
    `investmentId` INTEGER NOT NULL,

    UNIQUE INDEX `FinanceReport_id_key`(`id`),
    INDEX `FinanceReport_userId_idx`(`userId`),
    INDEX `FinanceReport_incomeId_idx`(`incomeId`),
    INDEX `FinanceReport_expenseId_idx`(`expenseId`),
    INDEX `FinanceReport_investmentId_idx`(`investmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FinanceReport` ADD CONSTRAINT `FinanceReport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceReport` ADD CONSTRAINT `FinanceReport_incomeId_fkey` FOREIGN KEY (`incomeId`) REFERENCES `Income`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceReport` ADD CONSTRAINT `FinanceReport_expenseId_fkey` FOREIGN KEY (`expenseId`) REFERENCES `Expense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinanceReport` ADD CONSTRAINT `FinanceReport_investmentId_fkey` FOREIGN KEY (`investmentId`) REFERENCES `Investments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

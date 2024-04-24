/*
  Warnings:

  - You are about to drop the `_categorytouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytouser` DROP FOREIGN KEY `_CategoryToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytouser` DROP FOREIGN KEY `_CategoryToUser_B_fkey`;

-- DropTable
DROP TABLE `_categorytouser`;

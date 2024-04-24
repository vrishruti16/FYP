/*
  Warnings:

  - You are about to drop the column `ingredientId` on the `recipeingredients` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientsId` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurement_unit` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `recipeingredients` DROP FOREIGN KEY `RecipeIngredients_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `recipeingredients` DROP FOREIGN KEY `RecipeIngredients_recipeId_fkey`;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `subscription` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `isPremium` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `recipeingredients` DROP COLUMN `ingredientId`,
    ADD COLUMN `ingredientsId` INTEGER NOT NULL,
    ADD COLUMN `measurement_unit` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `RecipeIngredients_ingredientsId_fkey` FOREIGN KEY (`ingredientsId`) REFERENCES `Ingredients`(`ingredientsId`) ON DELETE RESTRICT ON UPDATE CASCADE;

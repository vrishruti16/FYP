/*
  Warnings:

  - You are about to drop the column `quantity` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `recipe` table. All the data in the column will be lost.
  - Added the required column `steps` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `recipe` DROP FOREIGN KEY `Recipe_ingredientId_fkey`;

-- AlterTable
ALTER TABLE `ingredients` DROP COLUMN `quantity`,
    DROP COLUMN `recipeId`;

-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `ingredientId`,
    ADD COLUMN `steps` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `RecipeIngredients` (
    `recipeIngedientsId` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,

    PRIMARY KEY (`recipeIngedientsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `RecipeIngredients_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`recipeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredients` ADD CONSTRAINT `RecipeIngredients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredients`(`ingredientsId`) ON DELETE RESTRICT ON UPDATE CASCADE;

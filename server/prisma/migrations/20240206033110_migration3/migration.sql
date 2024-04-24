/*
  Warnings:

  - The primary key for the `recipeingredients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recipeIngedientsId` on the `recipeingredients` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - Added the required column `image` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipeIngredientsId` to the `RecipeIngredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recipeingredients` DROP PRIMARY KEY,
    DROP COLUMN `recipeIngedientsId`,
    ADD COLUMN `recipeIngredientsId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`recipeIngredientsId`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`;

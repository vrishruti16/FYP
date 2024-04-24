/*
  Warnings:

  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `RecipeIngredients_recipeId_fkey` ON `recipeingredients`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `bio`;

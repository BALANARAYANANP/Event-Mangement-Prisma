/*
  Warnings:

  - You are about to drop the column `data` on the `event` table. All the data in the column will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `data`,
    ADD COLUMN `date` DATETIME(3) NOT NULL;

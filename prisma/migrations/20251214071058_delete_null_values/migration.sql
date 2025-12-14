/*
  Warnings:

  - Made the column `testField1` on table `Crud` required. This step will fail if there are existing NULL values in that column.
  - Made the column `testField2` on table `Crud` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Crud" ALTER COLUMN "testField1" SET NOT NULL,
ALTER COLUMN "testField2" SET NOT NULL;

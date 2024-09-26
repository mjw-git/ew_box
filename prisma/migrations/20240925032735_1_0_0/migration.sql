/*
  Warnings:

  - Added the required column `type` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unix" INTEGER NOT NULL,
    "create_tm" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "tag" TEXT
);
INSERT INTO "new_Book" ("create_tm", "desc", "id", "price", "tag", "unix") SELECT "create_tm", "desc", "id", "price", "tag", "unix" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

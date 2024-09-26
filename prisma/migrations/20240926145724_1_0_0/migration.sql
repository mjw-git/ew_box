/*
  Warnings:

  - You are about to alter the column `price` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

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
    "price" REAL NOT NULL,
    "tag" TEXT
);
INSERT INTO "new_Book" ("create_tm", "desc", "id", "price", "tag", "type", "unix") SELECT "create_tm", "desc", "id", "price", "tag", "type", "unix" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

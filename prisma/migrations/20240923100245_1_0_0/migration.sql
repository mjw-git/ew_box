-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todo" TEXT NOT NULL,
    "start_tm" INTEGER,
    "is_star" INTEGER NOT NULL DEFAULT 0,
    "create_tm" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "finished_tm" INTEGER
);
INSERT INTO "new_Todo" ("create_tm", "finished_tm", "id", "start_tm", "status", "todo", "type") SELECT "create_tm", "finished_tm", "id", "start_tm", "status", "todo", "type" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

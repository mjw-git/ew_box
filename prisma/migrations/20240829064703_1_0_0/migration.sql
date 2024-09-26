-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todo" TEXT NOT NULL,
    "create_tm" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "type" INTEGER NOT NULL
);

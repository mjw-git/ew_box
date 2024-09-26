-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unix" INTEGER NOT NULL,
    "create_tm" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "tag" TEXT NOT NULL
);

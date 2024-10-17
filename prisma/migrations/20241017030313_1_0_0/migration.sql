-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "create_tm" INTEGER NOT NULL,
    "path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TaskItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "task_id" INTEGER NOT NULL,
    "img_name" TEXT NOT NULL DEFAULT '',
    "size" INTEGER NOT NULL,
    "compressed_size" INTEGER,
    "status" TEXT NOT NULL,
    CONSTRAINT "TaskItem_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Password" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT NOT NULL,
    "is_star" INTEGER DEFAULT 0,
    "username" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "create_tm" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Config" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todo" TEXT NOT NULL,
    "start_tm" INTEGER,
    "is_star" INTEGER NOT NULL DEFAULT 0,
    "create_tm" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "finished_tm" INTEGER
);

-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unix" INTEGER NOT NULL,
    "create_tm" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "tag" TEXT
);

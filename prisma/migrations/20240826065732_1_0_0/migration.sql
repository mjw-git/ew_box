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
    "username" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "create_tm" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Config" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);

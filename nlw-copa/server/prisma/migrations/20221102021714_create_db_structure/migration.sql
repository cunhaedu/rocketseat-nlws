-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pool_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "participant_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "first_team_country_code" TEXT NOT NULL,
    "second_team_country_code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_team_points" INTEGER NOT NULL,
    "second_team_points" INTEGER NOT NULL,
    "participant_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "guess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "guess_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT,
    CONSTRAINT "pool_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pool" ("code", "createdAt", "id", "title") SELECT "code", "createdAt", "id", "title" FROM "pool";
DROP TABLE "pool";
ALTER TABLE "new_pool" RENAME TO "pool";
CREATE UNIQUE INDEX "pool_code_key" ON "pool"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "participant_pool_id_user_id_key" ON "participant"("pool_id", "user_id");

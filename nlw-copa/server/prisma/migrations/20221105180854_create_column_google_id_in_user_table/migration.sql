/*
  Warnings:

  - You are about to drop the column `createdAt` on the `pool` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `guess` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `guess` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `game_id` to the `guess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `google_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" TEXT,
    CONSTRAINT "pool_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pool" ("code", "id", "owner_id", "title") SELECT "code", "id", "owner_id", "title" FROM "pool";
DROP TABLE "pool";
ALTER TABLE "new_pool" RENAME TO "pool";
CREATE UNIQUE INDEX "pool_code_key" ON "pool"("code");
CREATE TABLE "new_guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_team_points" INTEGER NOT NULL,
    "second_team_points" INTEGER NOT NULL,
    "participant_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "guess_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "guess_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_guess" ("first_team_points", "id", "participant_id", "second_team_points") SELECT "first_team_points", "id", "participant_id", "second_team_points" FROM "guess";
DROP TABLE "guess";
ALTER TABLE "new_guess" RENAME TO "guess";
CREATE TABLE "new_participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pool_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "participant_pool_id_fkey" FOREIGN KEY ("pool_id") REFERENCES "pool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_participant" ("id", "pool_id", "user_id") SELECT "id", "pool_id", "user_id" FROM "participant";
DROP TABLE "participant";
ALTER TABLE "new_participant" RENAME TO "participant";
CREATE UNIQUE INDEX "participant_pool_id_user_id_key" ON "participant"("pool_id", "user_id");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "google_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("avatarUrl", "email", "id", "name") SELECT "avatarUrl", "email", "id", "name" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_google_id_key" ON "user"("google_id");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

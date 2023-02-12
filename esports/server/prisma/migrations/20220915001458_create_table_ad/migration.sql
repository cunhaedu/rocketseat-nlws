-- CreateTable
CREATE TABLE "ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "years_playing" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "week_days" TEXT NOT NULL,
    "hour_start" INTEGER NOT NULL,
    "hour_end" INTEGER NOT NULL,
    "use_voice_channel" BOOLEAN NOT NULL,
    "game_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ad_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

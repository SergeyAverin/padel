from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255) NOT NULL  DEFAULT 'https://averin.pagekite.me/padel_backend/api/v1.0/user/image/default.png',
    "age" SMALLINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telegram_user_id" VARCHAR(255) NOT NULL,
    "position" VARCHAR(5) NOT NULL  DEFAULT 'both',
    "hand" VARCHAR(10) NOT NULL  DEFAULT 'right_hand',
    "status" VARCHAR(11) NOT NULL  DEFAULT 'player',
    "city" VARCHAR(255) NOT NULL  DEFAULT '',
    "country" VARCHAR(255) NOT NULL  DEFAULT '',
    "lvl" INT NOT NULL  DEFAULT 0,
    "is_first_open" BOOL NOT NULL  DEFAULT True,
    "gender" VARCHAR(5) NOT NULL  DEFAULT 'man'
);
COMMENT ON COLUMN "user"."position" IS 'LEFT: left\nRIGHT: right\nBOTH: both';
COMMENT ON COLUMN "user"."hand" IS 'LEFT_HAND: left_hand\nRIGHT_HAND: right_hand';
COMMENT ON COLUMN "user"."status" IS 'SUPER_ADMIN: super_admin\nCLUB_ADMIN: club_admin\nPLAYER: player';
COMMENT ON COLUMN "user"."gender" IS 'MAN: man\nWOMAN: woman\nANY: ANY';
CREATE TABLE IF NOT EXISTS "club" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(130) NOT NULL,
    "address" VARCHAR(130) NOT NULL,
    "registration_address" VARCHAR(130) NOT NULL,
    "city" VARCHAR(130) NOT NULL,
    "country" VARCHAR(130) NOT NULL,
    "avatar" VARCHAR(255) NOT NULL  DEFAULT 'https://averin.pagekite.me/padel_backend/api/v1.0/club/image/default.png',
    "opening" VARCHAR(6) NOT NULL  DEFAULT '08:00',
    "closing" VARCHAR(6) NOT NULL  DEFAULT '23:00',
    "owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "friendrequest" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "recipient_user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "sender_user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "tag" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(150) NOT NULL,
    "tag_owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "clubphoto" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "photo" VARCHAR(150) NOT NULL,
    "alt" VARCHAR(150) NOT NULL,
    "photo_club_id" INT NOT NULL REFERENCES "club" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "court" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(130) NOT NULL,
    "club_court_id" INT NOT NULL REFERENCES "club" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "match" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "status" VARCHAR(11) NOT NULL  DEFAULT 'expectation',
    "start_at" TIMESTAMPTZ NOT NULL,
    "end_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT '2024-09-07T07:32:20.954771',
    "text_user_1" VARCHAR(140),
    "text_user_2" VARCHAR(140),
    "text_user_3" VARCHAR(140),
    "text_user_4" VARCHAR(140),
    "match_lvl" VARCHAR(255) NOT NULL  DEFAULT '1-2',
    "first_team_score" INT NOT NULL  DEFAULT 0,
    "second_team_score" INT NOT NULL  DEFAULT 0,
    "is_private" BOOL NOT NULL  DEFAULT False,
    "gender" VARCHAR(5) NOT NULL  DEFAULT 'ANY',
    "club_id" INT NOT NULL REFERENCES "club" ("id") ON DELETE CASCADE,
    "owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "selected_court_id" INT NOT NULL REFERENCES "court" ("id") ON DELETE CASCADE,
    "user_1_id" INT REFERENCES "user" ("id") ON DELETE CASCADE,
    "user_2_id" INT REFERENCES "user" ("id") ON DELETE CASCADE,
    "user_3_id" INT REFERENCES "user" ("id") ON DELETE CASCADE,
    "user_4_id" INT REFERENCES "user" ("id") ON DELETE CASCADE
);
COMMENT ON COLUMN "match"."status" IS 'EXPECTATION: expectation\nPLAYED: played\nDONE: done';
COMMENT ON COLUMN "match"."gender" IS 'MAN: man\nWOMAN: woman\nANY: ANY';
CREATE TABLE IF NOT EXISTS "blank" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user_1" INT NOT NULL  DEFAULT 0,
    "user_2" INT NOT NULL  DEFAULT 0,
    "user_3" INT NOT NULL  DEFAULT 0,
    "user_4" INT NOT NULL  DEFAULT 0,
    "match_id" INT NOT NULL REFERENCES "match" ("id") ON DELETE CASCADE,
    "owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "joinrequst" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "index" INT NOT NULL,
    "join_request_match_id" INT NOT NULL REFERENCES "match" ("id") ON DELETE CASCADE,
    "join_request_user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "matchscore" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "first_team_score" INT NOT NULL  DEFAULT 0,
    "second_team_score" INT NOT NULL  DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL,
    "match_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);
CREATE TABLE IF NOT EXISTS "user_friends" (
    "user_rel_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_user_friend_user_re_d51527" ON "user_friends" ("user_rel_id", "user_id");
CREATE TABLE IF NOT EXISTS "clubs_bookmarks" (
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "club_id" INT NOT NULL REFERENCES "club" ("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_clubs_bookm_user_id_c3e073" ON "clubs_bookmarks" ("user_id", "club_id");
CREATE TABLE IF NOT EXISTS "friends_with_tag" (
    "tag_id" INT NOT NULL REFERENCES "tag" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_friends_wit_tag_id_0a22d2" ON "friends_with_tag" ("tag_id", "user_id");
CREATE TABLE IF NOT EXISTS "user_for_match" (
    "match_id" INT NOT NULL REFERENCES "match" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_user_for_ma_match_i_ea0949" ON "user_for_match" ("match_id", "user_id");"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """

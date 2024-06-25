from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "age" SMALLINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telegram_user_id" VARCHAR(255) NOT NULL,
    "position" VARCHAR(5) NOT NULL  DEFAULT 'both',
    "hand" VARCHAR(10) NOT NULL  DEFAULT 'right_hand'
);
COMMENT ON COLUMN "user"."position" IS 'LEFT: left\nRIGHT: right\nBOTH: both';
COMMENT ON COLUMN "user"."hand" IS 'LEFT_HAND: left_hand\nRIGHT_HAND: right_hand';
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
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_user_friend_user_re_d51527" ON "user_friends" ("user_rel_id", "user_id");"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """

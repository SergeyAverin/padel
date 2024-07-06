from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "tag" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(150) NOT NULL,
    "tag_owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-06 06:41:11.532044';
        CREATE TABLE "friends_with_tag" (
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "tag_id" INT NOT NULL REFERENCES "tag" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "friends_with_tag";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-05 05:01:15.070797';
        DROP TABLE IF EXISTS "tag";"""

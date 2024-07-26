from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-26 23:04:13.136965';
        CREATE TABLE IF NOT EXISTS "blank" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "user_1" INT NOT NULL  DEFAULT 0,
    "user_2" INT NOT NULL  DEFAULT 0,
    "user_3" INT NOT NULL  DEFAULT 0,
    "user_4" INT NOT NULL  DEFAULT 0,
    "match_id" INT NOT NULL REFERENCES "match" ("id") ON DELETE CASCADE,
    "owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-26 12:19:27.285595';
        DROP TABLE IF EXISTS "blank";"""

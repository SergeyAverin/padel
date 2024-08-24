from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-08-24 13:21:38.418481';
        CREATE TABLE IF NOT EXISTS "joinrequst" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "index" INT NOT NULL,
    "join_request_match_id" INT NOT NULL REFERENCES "match" ("id") ON DELETE CASCADE,
    "join_request_user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-08-24 12:45:20.054143';
        DROP TABLE IF EXISTS "joinrequst";"""

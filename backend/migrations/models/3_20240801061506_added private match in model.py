from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ADD "is_private" BOOL NOT NULL  DEFAULT False;
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-08-01 06:15:06.154275';
        CREATE TABLE "user_for_match" (
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "match_id" INT NOT NULL REFERENCES "match" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "user_for_match";
        ALTER TABLE "match" DROP COLUMN "is_private";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-31 10:11:01.952237';"""

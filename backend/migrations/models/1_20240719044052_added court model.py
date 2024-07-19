from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT 'https://averin.pagekite.me/api/v1.0/user/image/default.png';
        CREATE TABLE IF NOT EXISTS "court" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(130) NOT NULL,
    "club_court_id" INT NOT NULL REFERENCES "club" ("id") ON DELETE CASCADE
);
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-19 04:40:52.805140';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT 'http://averin.pagekite.me/api/v1.0/user/image/default.png';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-13 09:12:37.480009';
        DROP TABLE IF EXISTS "court";"""

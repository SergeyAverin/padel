from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:8080/api/v1.0/user/image/default.png';
        CREATE TABLE IF NOT EXISTS "clubphoto" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "photo" VARCHAR(150) NOT NULL,
    "alt" VARCHAR(150) NOT NULL,
    "photo_club_id" INT NOT NULL REFERENCES "club" ("id") ON DELETE CASCADE
);
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-09 05:28:56.654048';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:8080/api/v1.0/user/users/default.png';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-08 12:37:49.700699';
        DROP TABLE IF EXISTS "clubphoto";"""

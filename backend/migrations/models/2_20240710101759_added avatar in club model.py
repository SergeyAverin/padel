from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "club" ADD "avatar" VARCHAR(255) NOT NULL  DEFAULT 'http://localhost:8080/api/v1.0/clubs/image/default.png';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-10 10:17:59.246040';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "club" DROP COLUMN "avatar";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-09 05:34:31.378928';"""

from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "club" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:8080/api/v1.0/club/image/default.png';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-10 10:22:06.715652';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "club" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:8080/api/v1.0/clubs/image/default.png';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-10 10:18:04.649092';"""

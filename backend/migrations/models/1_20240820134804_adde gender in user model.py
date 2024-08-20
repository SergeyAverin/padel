from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ADD "gender" VARCHAR(5) NOT NULL  DEFAULT 'man';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-08-20 13:48:04.694597';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" DROP COLUMN "gender";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-08-17 23:49:00.184662';"""

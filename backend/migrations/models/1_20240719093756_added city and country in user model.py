from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ADD "city" VARCHAR(255) NOT NULL  DEFAULT '';
        ALTER TABLE "user" ADD "country" VARCHAR(255) NOT NULL  DEFAULT '';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-19 09:37:56.093148';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" DROP COLUMN "city";
        ALTER TABLE "user" DROP COLUMN "country";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-19 06:45:36.457855';"""

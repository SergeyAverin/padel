from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ALTER COLUMN "gender" TYPE VARCHAR(5) USING "gender"::VARCHAR(5);
        ALTER TABLE "match" ADD "gender" VARCHAR(5) NOT NULL  DEFAULT 'ANY';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-08-23 03:56:10.937333';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ALTER COLUMN "gender" TYPE VARCHAR(5) USING "gender"::VARCHAR(5);
        ALTER TABLE "match" DROP COLUMN "gender";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-08-21 07:41:36.274348';"""

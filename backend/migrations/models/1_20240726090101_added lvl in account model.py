from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ADD "lvl" INT NOT NULL  DEFAULT 0;
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-26 09:01:01.762968';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" DROP COLUMN "lvl";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-21 07:32:55.485361';"""

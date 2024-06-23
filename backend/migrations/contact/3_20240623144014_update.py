from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ADD "position" VARCHAR(5) NOT NULL  DEFAULT 'both';
        ALTER TABLE "user" ADD "hand" VARCHAR(10) NOT NULL  DEFAULT 'right_hand';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" DROP COLUMN "position";
        ALTER TABLE "user" DROP COLUMN "hand";"""

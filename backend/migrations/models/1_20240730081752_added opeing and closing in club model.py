from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "club" ADD "closing" VARCHAR(6) NOT NULL  DEFAULT '23:00';
        ALTER TABLE "club" ADD "opening" VARCHAR(6) NOT NULL  DEFAULT '08:00';
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-30 08:17:52.921494';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "club" DROP COLUMN "closing";
        ALTER TABLE "club" DROP COLUMN "opening";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-29 09:32:06.150561';"""

from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ADD "text_user_1" VARCHAR(140);
        ALTER TABLE "match" ADD "text_user_3" VARCHAR(140);
        ALTER TABLE "match" ADD "text_user_2" VARCHAR(140);
        ALTER TABLE "match" ADD "text_user_4" VARCHAR(140);
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-31 10:10:44.640197';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" DROP COLUMN "text_user_1";
        ALTER TABLE "match" DROP COLUMN "text_user_3";
        ALTER TABLE "match" DROP COLUMN "text_user_2";
        ALTER TABLE "match" DROP COLUMN "text_user_4";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-30 08:23:20.537730';"""

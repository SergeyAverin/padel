from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ADD "second_team_score" INT NOT NULL  DEFAULT 0;
        ALTER TABLE "match" ADD "first_team_score" INT NOT NULL  DEFAULT 0;
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-26 12:19:22.726731';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" DROP COLUMN "second_team_score";
        ALTER TABLE "match" DROP COLUMN "first_team_score";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-26 09:01:06.087255';"""

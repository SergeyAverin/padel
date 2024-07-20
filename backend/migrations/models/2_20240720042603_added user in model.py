from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" ADD "user_1_id" INT;
        ALTER TABLE "match" ADD "user_3_id" INT;
        ALTER TABLE "match" ADD "user_4_id" INT;
        ALTER TABLE "match" ADD "user_2_id" INT;
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-20 04:26:03.222686';
        ALTER TABLE "match" ADD CONSTRAINT "fk_match_user_a58596a1" FOREIGN KEY ("user_1_id") REFERENCES "user" ("id") ON DELETE CASCADE;
        ALTER TABLE "match" ADD CONSTRAINT "fk_match_user_9519448c" FOREIGN KEY ("user_2_id") REFERENCES "user" ("id") ON DELETE CASCADE;
        ALTER TABLE "match" ADD CONSTRAINT "fk_match_user_87c7dfe3" FOREIGN KEY ("user_3_id") REFERENCES "user" ("id") ON DELETE CASCADE;
        ALTER TABLE "match" ADD CONSTRAINT "fk_match_user_31021357" FOREIGN KEY ("user_4_id") REFERENCES "user" ("id") ON DELETE CASCADE;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "match" DROP CONSTRAINT "fk_match_user_31021357";
        ALTER TABLE "match" DROP CONSTRAINT "fk_match_user_87c7dfe3";
        ALTER TABLE "match" DROP CONSTRAINT "fk_match_user_9519448c";
        ALTER TABLE "match" DROP CONSTRAINT "fk_match_user_a58596a1";
        ALTER TABLE "match" DROP COLUMN "user_1_id";
        ALTER TABLE "match" DROP COLUMN "user_3_id";
        ALTER TABLE "match" DROP COLUMN "user_4_id";
        ALTER TABLE "match" DROP COLUMN "user_2_id";
        ALTER TABLE "match" ALTER COLUMN "created_at" SET DEFAULT '2024-07-19 09:38:03.372985';"""

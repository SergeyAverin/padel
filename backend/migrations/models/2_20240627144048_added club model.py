from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "club" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(130) NOT NULL,
    "address" VARCHAR(130) NOT NULL,
    "registration_address" VARCHAR(130) NOT NULL,
    "city" VARCHAR(130) NOT NULL,
    "owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "club";"""

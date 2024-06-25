from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "friendrequest" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "recipient_user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
    "sender_user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        DROP TABLE IF EXISTS "friendrequest";"""

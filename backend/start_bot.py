from tortoise import Tortoise
import asyncio
import logging
import sys

from aiogram.types.web_app_info import WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message

from core.config.bot_settings import bot_settings
from account.schemas import UserDTO
from account.service import user_service
from database import DB_PATH, MODELS

logger = logging.getLogger()


dp = Dispatcher()
bot = Bot(bot_settings.bot_token)


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    user = await user_service.get_user_by_telegram_user_id(str(message.from_user.id))
    if not user:
        user_data = UserDTO(
            age=0,
            email='',
            first_name=message.from_user.first_name,
            last_name=message.from_user.last_name,
            telegram_user_id=str(message.from_user.id),
            username=message.from_user.username
        )
        await user_service.create_user(user_data)

    url = bot_settings.bot_web_app
    keyboard = InlineKeyboardBuilder()
    web_app_info = WebAppInfo(url=url)
    button = types.InlineKeyboardButton(
        text='open app', web_app=web_app_info)
    keyboard.add(button)
    await message.answer('start message', reply_markup=keyboard.as_markup())


async def main() -> None:
    dp.loop.create_task(init_db())
    await dp.start_polling(bot)


async def init_db():
    await Tortoise.init(
        db_url=DB_PATH,
        modules={'models': MODELS}
    )
    await Tortoise.generate_schemas()


async def on_startup(dp):
    await init_db()


async def on_shutdown(dp):
    await Tortoise.close_connections()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

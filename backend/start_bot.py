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

logger = logging.getLogger()


dp = Dispatcher()
bot = Bot(bot_settings.bot_token)


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    url = bot_settings.bot_web_app
    keyboard = InlineKeyboardBuilder()
    web_app_info = WebAppInfo(url=url)
    button = types.InlineKeyboardButton(
        text='open app', web_app=web_app_info)
    keyboard.add(button)
    await message.answer('start message', reply_markup=keyboard.as_markup())


async def main() -> None:
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

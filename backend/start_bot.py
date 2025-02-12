import asyncio
import logging
import sys

from aiogram.types.web_app_info import WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import Message
import requests

from core.config.bot_settings import bot_settings
from core.config.api_settings import api_setting
from account.schemas import UserDTO, Hand, Position
from account.models import UserStatus
from account.service import user_service

logger = logging.getLogger()


dp = Dispatcher()
bot = Bot(bot_settings.bot_token)


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    url = f'https://{api_setting.api_domain}/padel_backend/api/v1.0/user/{str(message.from_user.id)}'
    res = requests.get(url)

    if res.status_code == 404:
        user_data = UserDTO(
            first_name=str(message.from_user.first_name),
            last_name=str(message.from_user.last_name),
            telegram_user_id=str(message.from_user.id),
            username=str(message.from_user.username),
            age=18,
            email='',
            status=UserStatus.PLAYER.value,
            hand=Hand.RIGHT_HAND,
            position=Position.BOTH,
            country='',
            city='',
            avatar='',
            lvl=1,
            is_first_open=True,
            id=1
        )
        url = f'https://{api_setting.api_domain}/padel_backend/api/v1.0/user/'
        data = user_data.model_dump()
        requests.post(url, json=data)

    url = bot_settings.bot_web_app
    keyboard = InlineKeyboardBuilder()
    web_app_info = WebAppInfo(url=url)
    button = types.InlineKeyboardButton(
        text='open app', web_app=web_app_info)
    keyboard.add(button)
    await message.answer('start message', reply_markup=keyboard.as_markup())


async def send_notification(user_id: str, comment: str, story_id: str):
    url = api_setting.api_frontend_domain
    base_webapp_url = f'{url}/match/{story_id}'
    keyboard = InlineKeyboardBuilder()
    web_app_info = WebAppInfo(url=base_webapp_url)
    button = types.InlineKeyboardButton(
        text='Open match', web_app=web_app_info
    )

    keyboard.add(button)
    await bot.send_message(
        user_id,
        comment,
        reply_markup=keyboard.as_markup()
    )


async def main() -> None:
    await dp.start_polling(bot)

async def send_notification_with_out_button(user_id: str, comment: str):
    url = api_setting.api_frontend_domain
    base_webapp_url = f'{url}/friends'
    keyboard = InlineKeyboardBuilder()
    web_app_info = WebAppInfo(url=base_webapp_url)
    button = types.InlineKeyboardButton(
        text='Open', web_app=web_app_info
    )
    keyboard.add(button)
    await bot.send_message(
        user_id,
        comment,
        reply_markup=keyboard.as_markup()
    )

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())

from account.models import User
from club.models import Club
from start_bot import send_notification


async def create_join_request_notification(match):
    await send_notification(
        int(match.owner.telegram_user_id),
        'New request on join  in match',
        match.id
    )


async def send_join_request_feedback(match, feedback: str):
    await send_notification(
        int(match.owner.telegram_user_id),
        feedback,
        match.id
    )

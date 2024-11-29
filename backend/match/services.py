from logging import getLogger

from match.schemas import MatchCreateDTO
from match.repositories import MatchRepository
from match.models import StatusEnum
from club.services import club_service, court_service
from account.models import User, Genders
from start_bot import send_notification

logger = getLogger()


class MatchService:
    def __init__(self) -> None:
        self.match_repository = MatchRepository()

    async def get_match_by_day(self, day: int, month: int, club_id: int):
        return await self.match_repository.get_match_by_day(day, month, club_id)

    async def get_club_for_match(self, user: User):
        return await self.match_repository.get_club_for_match(user)

    async def get_all_games(self, user_id: str):
        return await self.match_repository.get_all_match(user_id)

    async def get_matches_to_join_in_match(self, user_id: str):
        return await self.match_repository.get_matches_to_join_in_match(user_id)

    async def change_match_status(self, match_id: int, status: StatusEnum):
        match = await self.match_repository.get_match_by_id(match_id)
        match.status = status.value
        await match.save()
        return match

    async def chage_score(self, match_id: int, score: int, team: int):
        match = await self.match_repository.get_match_by_id(match_id)
        if team == 1:
            match.first_team_score = score
        elif team == 2:
            match.second_team_score = score
        await match.save()
        return match

    async def create_match(self,  match_create_data: MatchCreateDTO, user: User):
        club = await club_service.get_club_by_id(match_create_data.club_id)
        court = await court_service.get_court_by_id(match_create_data.court_id)

        match = await self.match_repository.create_match(match_create_data, club, user, court)
        if match.is_private:
            await self._send_user_for_match_notification(match.id, match_create_data.club_id)
        else:
             await self._send_notify_for_club_subscribers(
                 club.id, club.name, match.id)

        if match_create_data.user_1:
            if type(match_create_data.user_1) == str:
                match.user_1 = None
                match.text_user_1 = match_create_data.user_1
            else:
                match.user_1 = match_create_data.user_1
                match.text_user_1 = None
        else:
            match.user_1 = None

        if match_create_data.user_2:
            if type(match_create_data.user_2) == str:
                match.user_2 = None
                match.text_user_2 = match_create_data.user_2
            else:
                match.user_2 = match_create_data.user_2
                match.text_user_2 = None
        else:
            match.user_2 = None

        if match_create_data.user_3:
            if type(match_create_data.user_3) == str:
                match.user_3 = None
                match.text_user_3 = match_create_data.user_3
            else:
                match.user_3 = match_create_data.user_3
                match.text_user_3 = None
        else:
            match.user_3 = None

        if match_create_data.user_4:
            if type(match_create_data.user_4) == str:
                match.user_4 = None
                match.text_user_4 = match_create_data.user_4
            else:
                match.user_4 = match_create_data.user_4
                match.text_user_4 = None
        else:
            match.user_4 = None

        await match.save()

        return match

    async def get_match_by_id(self, match_id: int):
        return await self.match_repository.get_match_by_id(match_id)

    async def get_match_by_user(self, user_id: str):
        return await self.match_repository.get_match_by_user(user_id)

    async def get_match_by_club(self, club_id: str):
        return await self.match_repository.get_match_by_club(club_id)

    def delete_match_by_id(self):
        pass

    async def get_match_by_friends(self, user_id: str):
        return await self.match_repository.get_match_by_friends(user_id)

    async def get_matches_by_club_bookmarks(self, user_id: str):
        return await self.match_repository.get_matches_by_club_bookmarks(user_id)

    async def _send_user_for_match_notification(self, match_id, club_id):
        match = await self.get_match_by_id(match_id)
        users1 = await match.user_for_match
        users2 = await User.filter(clubs__id=club_id)
        users = list(set(users1) | set(users2))
        for user in users:
            if user.gender == match.gender or match.gender == Genders.ANY:
                match_lvl = match.match_lvl.split('-')
                if user.lvl >= float(match_lvl[0]) and user.lvl <= float(match_lvl[1]):
                    logger.debug(f'send notification {user.telegram_user_id}')
                    await send_notification(
                        int(user.telegram_user_id),
                        'You can join in the match',
                        match.id
                    )

    async def _send_notify_for_club_subscribers(self, club_id, club_name: str, match_id: int):
        users_in_club = await User.filter(clubs__id=club_id).prefetch_related("clubs")
        match = await self.get_match_by_id(match_id)
        match_lvl = match.match_lvl.split('-')
        #logger.error('0-0-0-0-0-0-0-0')
        #logger.error(club_id)
        #logger.error(match_lvl)
        #logger.error(users_in_club)
        for user in users_in_club:
            #logger.error( user.lvl >= float(match_lvl[0]))
            #logger.error( user.lvl <= float(match_lvl[1]))
            if user.lvl >= float(match_lvl[0]) and user.lvl <= float(match_lvl[1]):
                await send_notification(user.telegram_user_id,
                                  f'New game in {club_name} club', match_id)


match_service = MatchService()

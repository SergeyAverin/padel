from blank.repositories import BlankRepository


class BlankService:
    def __init__(self) -> None:
        self.blank_repository = BlankRepository()

    def creaet_blank(self):
        pass

    def _update_user_balance(slef):
        pass

    async def get_match_with_out_match(self, user_id: str):
        return await self.blank_repository.get_match_with_out_match(user_id)

    def get_balance_change_from_blank(slef):
        pass


blank_service = BlankService()

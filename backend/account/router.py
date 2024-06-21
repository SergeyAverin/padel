from fastapi import APIRouter


profile_router = APIRouter()


@profile_router.get('/')
def get_user():
    return {'message': 'hello world'}

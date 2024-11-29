from logging import getLogger

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

from core.middleware.access_logging import access_logging_middleware
from core.middleware.catch_exceptions import catch_exceptions_middleware
from core.config.logger_settings import clear_logs
from core.config.api_settings import api_setting
from account.router import profile_router
from friends.routes import friend_router
from club.routes import club_routes
from match.routes import match_router
from authentication.routers import auth_router
from blank.routes import blank_router
from join_request.routes import join_requset_api
from database import init_db
from match_score.routes import match_score_router

app = FastAPI()

if api_setting.api_is_debug:
    clear_logs()

logger = getLogger(__name__)

# if api_setting.api_is_debug:
#     app.middleware('http')(catch_exceptions_middleware)
app.middleware('http')(access_logging_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=api_setting.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix='/padel_backend/api/v1.0')
api_router.include_router(profile_router)
api_router.include_router(friend_router)
api_router.include_router(club_routes)
api_router.include_router(match_router)
api_router.include_router(auth_router)
api_router.include_router(blank_router)
api_router.include_router(join_requset_api)
api_router.include_router(match_score_router)

@api_router.get('/hello')
def hello_word():
    return {'message': 'hello world'}


app.include_router(api_router)


async def startup_event():
    ''' Запуск приложения. '''
    logger.info('Server start http://%s:%s',
                api_setting.api_host, api_setting.api_port)
    init_db(app)
    add_pagination(app)


app.add_event_handler("startup", startup_event)

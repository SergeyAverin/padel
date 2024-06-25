from logging import getLogger

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from core.middleware.access_logging import access_logging_middleware
from core.middleware.catch_exceptions import catch_exceptions_middleware
from core.config.logger_settings import clear_logs
from core.config.api_settings import api_setting
from account.router import profile_router
from friends.routes import friend_router
from database import init_db

app = FastAPI()

if api_setting.api_is_debug:
    clear_logs()

logger = getLogger(__name__)

if api_setting.api_is_debug:
    app.middleware('http')(catch_exceptions_middleware)
app.middleware('http')(access_logging_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=api_setting.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix='/api/v1.0')
api_router.include_router(profile_router)
api_router.include_router(friend_router)
app.include_router(api_router)


async def startup_event():
    ''' Запуск приложения. '''
    logger.info('Server start http://%s:%s',
                api_setting.api_host, api_setting.api_port)
    init_db(app)

app.add_event_handler("startup", startup_event)

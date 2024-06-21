from logging import getLogger
import traceback

from fastapi import Request, status
from fastapi.responses import JSONResponse

from core.config.api_settings import api_setting


logger = getLogger(__name__)


async def catch_exceptions_middleware(request: Request, call_next):
    ''' 
    Middleware, который логирует все ошибки и возвращает 500 ошибку в статусе http ответа.
    Если API_IS_DEBUG имеет значение  True, пользователю виден traceback.
    '''

    try:
        return await call_next(request)
    except Exception as error:
        logger.error(error.__class__.__name__)
        # В debug режиме возвращает traceback ошибки
        content = {
            'status_code': 500,
            'error': error.__class__.__name__,
        }

        if api_setting.api_is_debug:
            error_message = traceback.format_exc()
            content['traceback'] = error_message

        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=content
        )

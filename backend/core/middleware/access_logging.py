from logging import getLogger

from fastapi import Request


access_logger = getLogger('access_logger')


async def access_logging_middleware(request: Request, call_next):
    ''' Middleware, который логирует все http запросы в файл logs/access_logs.log. '''

    access_logger.info('%s: %s', request.method, request.url)

    response = await call_next(request)

    return response

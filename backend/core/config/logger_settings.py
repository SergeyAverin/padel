''' Настройка логгера '''
from traceback import print_exception
from io import StringIO

import logging

from core.config.api_settings import api_setting


LOGGING_DIR = '/usr/src/app/logs'
ERROR_LOGS_FILE = f'{LOGGING_DIR}/error_logs.log'
ACCESS_LOGS_FILE = f'{LOGGING_DIR}/access_logs.log'
DEBUG_LOGS_FILE = f'{LOGGING_DIR}/debug_logs.log'
MAIN_LOGS_FILE = f'{LOGGING_DIR}/main_logs.log'

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


def only_filter(lvl: str):
    '''
        Позволяет записывать в логи только те логи которые соответствуют указанному уровню.
        Parameters:
         :param lvl: уровень логов которые будут записываться.
    '''
    return lambda record: record.levelno == lvl


class TracebackFormatter(logging.Formatter):
    ''' Formatter, который выводит traceback. '''

    def formatException(self, ei):
        sio = StringIO()
        print_exception(ei[0], ei[1], ei[2], None, sio)
        return sio.getvalue()

    def format(self, record):
        if record.exc_info:
            record.exc_text = self.formatException(record.exc_info)
        else:
            record.exc_text = ""
        return super().format(record)


error_formatter = TracebackFormatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s - %(exc_text)s'
)
formatter = logging.Formatter(
    "%(asctime)s - %(name)s - %(levelname)s - %(message)s")


# Handler который выводит все логи в терминал
stream_handler = logging.StreamHandler()
STREAM_HANDLER_LVL = logging.INFO
if api_setting.api_is_debug:
    STREAM_HANDLER_LVL = logging.DEBUG
stream_handler.setLevel(STREAM_HANDLER_LVL)

stream_handler.setFormatter(formatter)

logger.addHandler(stream_handler)


# Handler который записывает все исключения в logs/error_logs.log
error_handler = logging.FileHandler(ERROR_LOGS_FILE)
error_handler.setLevel(logging.ERROR)
error_handler.addFilter(only_filter(logging.ERROR))

error_handler.setFormatter(error_formatter)

logger.addHandler(error_handler)

#  Handler который записывает все debug сообщения в logs/error_logs.log
debug_handle = logging.FileHandler(DEBUG_LOGS_FILE)
debug_handle.setLevel(logging.DEBUG)
debug_handle.addFilter(only_filter(logging.DEBUG))

debug_handle.setFormatter(formatter)

logger.addHandler(debug_handle)

# Handler сохраняющий все логи в файл
main_handle = logging.FileHandler(MAIN_LOGS_FILE)
main_handle.setLevel(logging.DEBUG)
# debug_handle.addFilter(logging.DEBUG)
main_handle.setFormatter(formatter)

logger.addHandler(main_handle)

# Применение настроек по умолчанию
logging.basicConfig(logger=logger)


#  Отдельный логер для сохранения http запросов в logs/error_logs.log
access_logger = logging.getLogger('access_logger')
access_logger.setLevel(logging.INFO)

access_handle = logging.FileHandler(ACCESS_LOGS_FILE)
access_handle.setLevel(logging.INFO)
access_handle.addFilter(only_filter(logging.INFO))

access_handle.setFormatter(formatter)

access_logger.addHandler(access_handle)


def clear_log_file(file_path: str):
    ''' Очищает переданный файл. '''
    try:
        with open(file_path, mode='w', encoding='utf-8') as file:
            file.write('')
    except FileNotFoundError:
        pass


def clear_logs():
    ''' Если приложение в режиме дебага, очищает логи при каждом запуске приложения. '''
    if api_setting.api_is_debug:
        clear_log_file(ERROR_LOGS_FILE)
        clear_log_file(ACCESS_LOGS_FILE)
        clear_log_file(DEBUG_LOGS_FILE)
        clear_log_file(MAIN_LOGS_FILE)

import uvicorn

from core.config.api_settings import api_setting


if __name__ == "__main__":
    uvicorn.run("app:app",
                host=api_setting.api_host,
                port=api_setting.api_port,
                reload=api_setting.api_is_debug,
                workers=api_setting.api_workers_count)

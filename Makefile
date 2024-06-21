# Запускает проект в режиме разработки 
up:
	sudo docker-compose -f docker-compose.dev.yml up

# Открывает командную оболочку бекенда
backshell:
	sudo docker exec -it bubble_backend /bin/bash

# Открывает командную оболочку фронтенда
frontshell:
	sudo docker exec -it bubble_frontend /bin/bash

prod:
	sudo docker-compose -f docker-compose.prod.yml up

# # Открывает командную оболочку фронтенда
prodfrontshell:
	sudo docker exec -it bubble_frontend_prod /bin/bash

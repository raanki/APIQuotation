.PHONY: all back down front

all: back front

back:
	docker compose up --build -d

down:
	docker compose down

front:
	cd front && npm install && npm run dev

logs:
	docker compose logs -f


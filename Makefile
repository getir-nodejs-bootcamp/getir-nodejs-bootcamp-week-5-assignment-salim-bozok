mongo:
	docker run --name some-mongo -p0.0.0.0:27017:27017 -d mongo:5

dev:
	npm run dev

start:
	docker-compose up -d
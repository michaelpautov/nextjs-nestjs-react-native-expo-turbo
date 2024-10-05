.PHONY: docker dev-docker docker-dowm setup deploy-server

# Target to build Docker containers
docker:
	docker compose -f docker-compose.yml --env-file ./.env up --build -d

# Target to build Docker containers
dev-docker:
	docker compose -f docker-compose.yml --env-file ./.env.development up --build -V

docker-clean:
	docker compose rm -f

# Target to stop Docker containers
docker-down:
	docker compose down

setup:
	./scripts/project-setup.sh


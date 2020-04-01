build:
	@docker build -t synctime -f Dockerfile.dev .

run:
	@docker run -d --name synctime -p 8000:8000 -v $(PWD):/app -v /app/node_modules -e GATSBY_TELEMETRY_DISABLED=1 synctime

stop:
	@docker stop synctime

down: stop
	@docker rm synctime

logs:
	@docker logs -f synctime

shell:
	@docker exec -it synctime bash

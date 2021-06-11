#!/usr/bin/env bash
set -e

cleanup() {
    docker-compose -f  docker-compose.dev.yml down
    trap '' EXIT INT TERM
    exit $err
}

trap cleanup SIGINT EXIT

if [ -z "$(docker network ls -qf name=^entropic$)" ]; then
  echo "Creating network"
  docker network create entropic >/dev/null
fi

COMPOSE_HTTP_TIMEOUT=120 docker-compose -f docker-compose.dev.yml up -d --force-recreate

npm run dev-server

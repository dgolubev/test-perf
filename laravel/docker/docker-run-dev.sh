#!/bin/bash

cd $(dirname $0) || exit

export APP_DIR="/app"


docker-compose -f ./docker-compose-base.yaml up  --build --remove-orphans --force-recreate
docker-compose -f ./docker-compose-base.yaml down --volumes --remove-orphans

docker rmi -f $(docker image ls "*prospero*"  --format "{{.ID}}")

docker volume prune -f

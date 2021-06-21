#!/bin/bash

git clone https://github.com/pmckeetx/docker-nginx.git
cd docker-nginx
mv ../docker-compose.yml docker-compose.yml
docker-compose build
docker login
docker-compose push epylkkan/training_docker_devops:exercise32

2.1  - see, the picture in the folder ./2.1

docker-compose.yml:

version: '3'
services:
  ex21:
    image: devopsdockeruh/simple-web-service:alpine
    build: .
    volumes:
      - /home/epylkkan/tmp/text.log:/usr/src/app/text.log



2.2

docker-compose.yml:

version: '3'
services:
  ex22:
    image: devopsdockeruh/simple-web-service:alpine
    build: .
    ports:
      - 8080:8080
    command: ex22 server



2.3 - see, the pictures in the folder ./2.3

docker-compose.yml:

version: '3.5'
services:
    back:
      image: epylkkan/training_docker_devops:back
      ports:
        - 8080:8080
      container_name: back
      environment:
        - FRONT_END=http://localhost:5000

    front:
        image: epylkkan/training_docker_devops:front
        ports:
          - 5000:5000
        container_name: front
        environment:
          - REQUEST_ORIGIN=http://localhost:5000



2.4 - see, the picture in the folder ./2.4

docker-compose.yml:

version: '3.5'
services:
    redis:
      image: redis

    back:
      image: epylkkan/training_docker_devops:back
      ports:
        - 8080:8080
      container_name: back
      environment:
        - FRONT_END=http://localhost:5000
        - REDIS_HOST=redis

    front:
        image: epylkkan/training_docker_devops:front
        ports:
          - 5000:5000
        container_name: front



2.5 - see, the pictures in the folder ./2.5

docker-compose up --scale compute=3



2.6 - see, the picture in the folder ./2.6

version: '3.5' 
services: 
    redis:
      image: redis

    db:
      image: postgres:13.2-alpine
      container_name: post
      restart: unless-stopped  
      environment: 
        - POSTGRES_PASSWORD=password
        - POSTGRES_USER=user
        - POSTGRES_HOST=post      
      
    back: 
      image: epylkkan/training_docker_devops:back
      ports: 
        - 8080:8080
      environment: 
        - FRONT_END=http://localhost:5000
        - REDIS_HOST=redis
        - POSTGRES_PASSWORD=password
        - POSTGRES_USER=user
        - POSTGRES_HOST=post

    front:
      image: epylkkan/training_docker_devops:front
      ports: 
        - 5000:5000
      container_name: front
      environment: 
        - REQUEST_ORIGIN=http://localhost:5000



2.7 

docker-compose.yml: 

version: '3'
services:
  back:
    build: back
    ports:
      - 5000:5000
    volumes:
      - training_data:/src/model
  front:
    build: front
    ports:
      - 3000:3000
  training:
    build: training
    volumes:
      - training_data:/src/model
      - images:/src/imgs

volumes:
  training_data:
  images:



2.8 - see, the picture in the folder ./2.8

docker-compose.yml:

version: '3.5'
services:
    redis:
      image: redis

    db:
      image: postgres:13.2-alpine
      container_name: post
      restart: unless-stopped
      environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=user
      - POSTGRES_HOST=post

    back:
      image: epylkkan/training_docker_devops:back
      ports:
        - 8080:8080
      depends_on:
        - db
        - redis
      environment:
        - FRONT_END=http://localhost:5000
        - REDIS_HOST=redis
        - POSTGRES_PASSWORD=password
        - POSTGRES_USER=user
        - POSTGRES_HOST=post

    front:
      image: epylkkan/training_docker_devops:front
      ports:
        - 5000:5000
      container_name: front
      environment:
        - REQUEST_ORIGIN=http://localhost:5000

    proxy:
      image: nginx
      container_name: nginxproxy
      volumes:
        - ./nginx.conf:/etc/nginx/nginx.conf
      ports:
        - 80:80


nginx.conf:

events { worker_connections 1024; }

  http {
    server {
      listen 80;

      location / {
        proxy_pass http://front:5000/;
      }

      location /api/ {        
        proxy_set_header Host $host;
        proxy_pass http://back:8080/;
      }
    }   
  }



2.9 

docker-compose.yml:

version: '3.5'
services:
    redis:
      image: redis
      volumes:
        - ./redisdata:/data

    db:
      image: postgres:13.2-alpine
      container_name: post
      restart: unless-stopped
      environment:
        - POSTGRES_PASSWORD=password
        - POSTGRES_USER=user
        - POSTGRES_HOST=post
      volumes:
        - ./database:/var/lib/postgresql/data

    back:
      image: epylkkan/training_docker_devops:back
      ports:
        - 8080:8080
      environment:
        - FRONT_END=http://localhost:5000
        - REDIS_HOST=redis
        - POSTGRES_PASSWORD=password
        - POSTGRES_USER=user
        - POSTGRES_HOST=post

    front:
      image: epylkkan/training_docker_devops:front
      ports:
        - 5000:5000
      container_name: front
      environment:
        - REQUEST_ORIGIN=http://localhost:5000



2.10 - see, the picture in the folder ./2.10


Dockerfiles for the images (front & back) are in the folders /part1/1.12 and /part1/1.13.

docker-compose.yml:

version: '3.5'
services:
    redis:
      image: redis
      volumes:
        - ./redisdata:/data

    db:
      image: postgres:13.2-alpine
      container_name: post
      restart: unless-stopped
      environment:
        - POSTGRES_PASSWORD=password
        - POSTGRES_USER=user
        - POSTGRES_HOST=post
      volumes:
        - ./database:/var/lib/postgresql/data

    back:
      image: epylkkan/training_docker_devops:back
      ports:
        - 8080:8080
      container_name: back
      depends_on:
        - db
        - redis
      environment:
        - REDIS_HOST=redis
        - POSTGRES_PASSWORD=password
        - POSTGRES_USER=user
        - POSTGRES_HOST=post
        - REQUEST_ORIGIN=http://localhost

    front:
      image: epylkkan/training_docker_devops:front
      ports:
        - 5000:5000
      container_name: front
      environment:
        - REQUEST_ORIGIN=http://localhost:5000

    proxy:
      image: nginx
      container_name: nginxproxy
      volumes:
        - ./nginx.conf:/etc/nginx/nginx.conf
      ports:
        - 80:80


nginx.conf:

events { worker_connections 1024; }

  http {
    server {
      listen 80;

      location / {
        proxy_pass http://front:5000/;
      }

      location /api/ {
        proxy_pass http://back:8080/;
      }
    }
  }



2.11


This is one of the first exercises in the "Full Stack Development" -course.
"Anecdotes" -application developed with node.js was wrapped into a container.
docker-compose up -> localhost:3000


Dockerfile: 

FROM node:15
COPY . .
RUN npm install


docker-compose.yml:

version: '3.7'
services:
  node-dev-env:
    build: . # Build with the Dockerfile here
    command: npm start # Run npm start as the command
    ports:
      - 3000:3000 # The app uses port 3000 by default, publish it as 3000
    volumes:
      - ./:/usr/src/app # Let us modify the contents of the container locally
      - node_modules:/usr/src/app/node_modules # A bit of node magic, this ensures the dependencies built for the image are not available locally.
    container_name: node-dev-env # Container name for convenience

volumes: # This is required for the node_modules named volume
  node_modules:


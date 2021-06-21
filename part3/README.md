3.1 - see, the pictures in the folder ./3.1

1) GitHub
epylkkan/docker-hy.github.io
Secrets were removed after completing the exercise, see the removed_secrets_in_github.png file

Changes to https://github.com/docker-hy/docker-hy.github.io:
.github/workflows/build.yml updated
docker-compose.yml created

2) Dockerhub
epylkkan/training_docker_devops:exercise31

3) HEROKU
docker-devops-exercise31.herokuapp.com


build.yml: 

name: Release DevOps with Docker
on:
  push:
    branches: 
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Login to DockerHub
      uses: docker/login-action@v1 
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push
      uses: docker/build-push-action@v2
      with:
        push: true
        tags: epylkkan/training_docker_devops:exercise31
        
    - name: Push to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: ${{secrets.HEROKU_APP_NAME}}
        heroku_email: ${{secrets.HEROKU_EMAIL}}
        usedocker: true        


docker-compose.yml:

version: "3"
services:
  coursematerial:
    image: epylkkan/training_docker_devops:exercise31
    ports:
      - 4000:80
    container_name: coursematerial
  watchtower:
    image: containrrr/watchtower
    environment:
      -  WATCHTOWER_POLL_INTERVAL=60 # Poll every 60 seconds
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    container_name: watchtower



3.2

1) Application cloned within the container: https://github.com/pmckeetx/docker-nginx.git

2) Images created for frontend and backend based on the respective Dockerfiles found at ...docker-nginx.git
  
   epylkkan/training_docker_devops:exercise32-front
   epylkkan/training_docker_devops:exercise32-back


3) Dockerfile used to create the container

FROM ubuntu
COPY ./script.sh ./

COPY ./docker-compose-yml-to-container ./docker-compose.yml

RUN apt-get update
RUN apt-get install -y git

RUN apt-get install -y \
   apt-transport-https \
   ca-certificates \
   curl \
   gnupg \
   lsb-release

RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y software-properties-common
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
RUN apt-get install -y docker-ce docker-ce-cli containerd.io
RUN curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

CMD bash ./script.sh


4) script.sh which is executed as a last step in the container

git clone https://github.com/pmckeetx/docker-nginx.git
cd docker-nginx
mv ../docker-compose.yml docker-compose.yml
docker-compose build
docker login
docker-compose push epylkkan/training_docker_devops:exercise32


5) docker-compose.yml file in the container (docker-compose.yml is created in the container for this app instead of Dockerfile)

version: '3.8'
services:
  frontend:
    image: epylkkan/training_docker_devops:exercise32-front
    build:
      context: ./frontend
      args:
        - REACT_APP_SERVICES_HOST=/services/m
    ports:
      - "80:80"
    networks:
      - frontend
      - backend

  backend:
    image: epylkkan/training_docker_devops:exercise32-back
    build:
      context: ./backend
    networks:
      - backend

networks:
  frontend:
  backend: 


6) Commands used to start the process

$ docker build . -t epylkkan/training_docker_devops:exercise32
$ docker run -it -v /var/run/docker.sock:/var/run/docker.sock epylkkan/training_docker_devops:exercise32



3.3 - see, the docker-compose.yml, nginx.conf and container sizes in the folder ./3.3

Dockerfiles: 

1) backend

FROM openjdk:8
ENV REQUEST_ORIGIN=http://localhost:5000

WORKDIR /
COPY ./example-backend/server .
RUN chmod 755 ./server
COPY go1.16.3.linux-amd64.tar.gz .
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.3.linux-amd64.tar.gz
RUN rm -rf go1.16.3.linux-amd64.tar.gz
RUN export PATH=$PATH:/usr/local/go/bin

RUN git clone https://github.com/docker-hy/material-applications 
RUN mv /material-applications/example-backend /example-backend/
RUN rm -rf /material-applications

RUN useradd -m appuser
RUN chown appuser .
USER appuser

CMD ./server


2) frontend

FROM openjdk:8

WORKDIR /
RUN apt-get update && apt-get install -y git
RUN apt-get update -y 
RUN apt-get install curl gnupg2 -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN git clone https://github.com/docker-hy/material-applications
RUN mv /material-applications/example-frontend /example-frontend/
RUN rm -rf /material-applications

WORKDIR /example-frontend

RUN REACT_APP_BACKEND_URL=http://localhost:8080/
RUN apt-get install nodejs -y
RUN npm install
RUN npm install npm@latest -g
RUN npm install -g create-react-app
RUN npm install -g serve
RUN npm run build

RUN useradd -m appuser
RUN chown appuser .
USER appuser

CMD serve -s -l 5000 build



3.4 - see, the docker-compose.yml, nginx.conf and container sizes picture in the folder ./3.4

Dockerfiles: 

1) backend

FROM openjdk:8
ENV REQUEST_ORIGIN=http://localhost:5000

WORKDIR /
COPY ./example-backend/server .
RUN chmod 755 ./server
COPY go1.16.3.linux-amd64.tar.gz .
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.3.linux-amd64.tar.gz && \
    rm -rf go1.16.3.linux-amd64.tar.gz && \
    export PATH=$PATH:/usr/local/go/bin && \
    git clone https://github.com/docker-hy/material-applications && \
    mv /material-applications/example-backend /example-backend/ && \
    rm -rf /material-applications && \
    apt-get purge -y --auto-remove curl git && \ 
    rm -rf /var/lib/apt/lists/* && \
    useradd -m appuser && \
    chown appuser .

USER appuser

CMD ./server


2) frontend

FROM openjdk:8
WORKDIR /
RUN apt-get update && apt-get install -y git && \
    apt-get update -y && \
    apt-get install curl gnupg2 -y && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \

    git clone https://github.com/docker-hy/material-applications && \
    mv /material-applications/example-frontend /example-frontend/ && \
    rm -rf /material-applications

WORKDIR /example-frontend

RUN REACT_APP_BACKEND_URL=http://localhost:8080/ && \
    apt-get install nodejs -y && \
    npm install && \
    npm install -g serve && \
    npm run build && \
    apt-get purge -y --auto-remove curl git && \ 
    rm -rf /var/lib/apt/lists/* && \
    
    useradd -m appuser && \
    chown appuser .
    
USER appuser

CMD serve -s -l 5000 build


Container sizes: 
"
Base for frontend and backend was the version created in the exercise 3.3.

Container sizes before (3.3) and after (3.4) optimization 
- frontend:  929 MB ->  904 MB
- backend: 1.07 GB -> 1.07 GB 

The reduction in the size for frontend was achieved by chaining the RUN statementes and removal the files not needed.
In backend it was possible only to chain the RUN statements which did not have an impact contrary to the expectations.
"



3.5 -  see, the docker-compose.yml, nginx.conf and container sizes picture in the folder ./3.5

Dockerfiles: 

1) backend

FROM alpine
ENV REQUEST_ORIGIN=http://localhost:5000

WORKDIR /

RUN apk update && apk add --no-cache git make musl-dev go && \
    git clone https://github.com/docker-hy/material-applications && \
    mv /material-applications/example-backend /example-backend/ && \
    rm -rf /material-applications 

RUN GOROOT="/usr/lib/go" && GOPATH="/go" && PATH="/go/bin:$PATH" && \
    mkdir -p ${GOPATH}/src ${GOPATH}/bin && \
    go get -u github.com/Masterminds/glide/...

WORKDIR /example-backend

RUN go build && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/* $HOME/.cache && \
    rm -rf /var/lib/apt/lists/* && \
    adduser -D appuser && \
    chown appuser .

USER appuser

CMD ./server


2) frontend

FROM alpine
WORKDIR /
RUN apk update && apk add --no-cache git curl npm bash nodejs && \
    curl -sL https://deb.nodesource.com/setup_14.x && \
    git clone https://github.com/docker-hy/material-applications && \
    mv /material-applications/example-frontend /example-frontend/ && \
    rm -rf /material-applications

WORKDIR /example-frontend

RUN REACT_APP_BACKEND_URL=http://localhost:8080/ && \
    npm install && \
    npm install -g serve && \
    npm run build && \
    apk del curl git && \ 
    rm -rf /var/lib/apt/lists/* && \    
    adduser -D appuser && \
    chown appuser . && \
    npx browserslist@latest --update-db
    
USER appuser

CMD serve -s -l 5000 build


Container sizes: 
"
Base for frontend and backend was the version created in the exercise 3.4.

Container sizes before (3.3), after optimization (3.4) and after further optimization (3.5) 
- frontend:  929 MB ->  904 MB -> 307 MB
- backend: 1.07 GB -> 1.07 GB -> 572 MB

Final step reductions were coming from changing the OS-image to Alpine.
Steps in the Dockerfiles to install node.js, go etc. had to be adjusted to Alpine.
"



3.6 - see, the docker-compose.yml, nginx.conf and container sizes picture in the folder ./3.6

Dockerfiles: 

1) backend

FROM alpine AS build-env
WORKDIR /

RUN apk update && apk add --no-cache git go && \
    git clone https://github.com/docker-hy/material-applications && \
    mv /material-applications/example-backend /example-backend/ && \
    rm -rf /material-applications 

RUN GOROOT="/usr/lib/go" && GOPATH="/go" && PATH="/go/bin:$PATH" && \
    mkdir -p ${GOPATH}/src ${GOPATH}/bin && \
    go get -u github.com/Masterminds/glide/...

WORKDIR /example-backend
RUN go build -o server

FROM alpine

RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/* $HOME/.cache && \
    rm -rf /var/lib/apt/lists/* && \
    adduser -D appuser && \
    chown appuser .

USER appuser

WORKDIR /
COPY --from=build-env /example-backend/server /

CMD /server


2) frontend

FROM node:14-alpine AS build-env
WORKDIR /

RUN apk update && apk add --no-cache git curl npm bash nodejs && \
    curl -sL https://deb.nodesource.com/setup_14.x && \
    git clone https://github.com/docker-hy/material-applications && \
    mv /material-applications/example-frontend /example-frontend/ && \
    rm -rf /material-applications

WORKDIR /example-frontend

RUN REACT_APP_BACKEND_URL=http://localhost:8080/ && \
    npm install && \
    npm run build && \
    apk del curl git && \ 
    rm -rf /var/lib/apt/lists/* 

FROM node:14-alpine

COPY --from=build-env /example-frontend/build /build

RUN adduser -D appuser && \
    chown appuser . && \
    npm install -g serve 
    
USER appuser

CMD serve -s -l 5000 build

Container sizes: 
"
Base for frontend and backend was the version created in the exercise 3.5.
Container sizes before (3.3), after optimization (3.4), after further optimization (3.5) and after multi-stage approach (3.6)

- frontend:  929 MB ->  904 MB -> 307 MB -> 125 MB 
- backend: 1.07 GB -> 1.07 GB -> 572 MB -> 25.7 MB 
"



3.7 - see, the container sizes picture and docker-compose.yml in the foloder ./3.7

Application: spring-example-project -project (Java) from the course material

Dockerfiles: 

1) Non size optimized

FROM openjdk:8 
WORKDIR .
COPY ./spring-example-project .
RUN chmod +x mvnw
RUN ./mvnw package
EXPOSE 8080
CMD java -jar ./target/docker-example-1.1.3.jar

2) Size optimized

FROM openjdk:8 AS build-env
WORKDIR .
COPY ./spring-example-project .
RUN chmod +x mvnw
RUN ./mvnw package
RUN chmod +x ./target/docker-example-1.1.3.jar

FROM openjdk:8-jre-alpine
WORKDIR /
COPY --from=build-env "./target/docker-example-1.1.3.jar" .

EXPOSE 8080
CMD java -jar ./docker-example-1.1.3.jar


Size differences: 
- No size optimization: 599 MB
- Size optimized: 103 MB



3.8 - see, the picture in the folder ./3.8

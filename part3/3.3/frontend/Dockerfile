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



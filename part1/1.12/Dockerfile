FROM openjdk:8

WORKDIR . 
COPY example-frontend .
RUN apt-get update -y 
RUN apt-get install curl gnupg2 -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install nodejs -y
RUN npm install npm@latest -g
RUN npm install -g create-react-app
RUN npm install -g serve
RUN REACT_APP_BACKEND_URL=http://localhost:8080 npm run build

CMD serve -s -l 5000 build




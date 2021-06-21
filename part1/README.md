<h3> 1.1 </h3>
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                      PORTS     NAMES
a4d48ee762b0   nginx     "/docker-entrypoint.…"   10 minutes ago   Exited (0) 45 seconds ago             romantic_mcnulty
2439d0cbb4c4   nginx     "/docker-entrypoint.…"   14 minutes ago   Exited (0) 45 seconds ago             compassionate_shaw
73e41231fcd2   nginx     "/docker-entrypoint.…"   14 minutes ago   Up 14 minutes               80/tcp    unruffled_sammet

 

<h3>1.2 - see, the pictures in the folder ./1.2 </h3>

$ docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

$ docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE



<h3>1.3 - see, the picture in the folder ./1.3 </h3>
docker run -it devopsdockeruh/simple-web-service:ubuntu
You can find the source code here: https://github.com/docker-hy



<h3>1.4</h3>

OPTION 1

$ docker run -d --rm -it --name foo ubuntu sh -c 'echo "Input website:"; read website; echo "Searching.."; sleep 1; curl http://$website;'
-> curl not found

$ docker exec -it foo bash
-> # apt-get update
-> # apt-get install -y curl
-> # exit

-> New window
$ docker attach foo
helsinki.fi
Searching..
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>301 Moved Permanently</title>
</head><body>
<h1>Moved Permanently</h1>
<p>The document has moved <a href="http://www.helsinki.fi/">here</a>.</p>
</body></html>


OPTION 2

$ docker run -d -it --name foo ubuntu sh -c 'echo "Input website:"; read website; echo "Searching.."; sleep 1; curl http://$website;'
-> curl not found

$ docker run -d -it --name foo ubuntu 
$ docker exec -it foo bash
-> # apt-get update
-> # apt-get install -y curl
-> # sh -c 'echo "Input website:"; read website; echo "Searching.."; sleep 1; curl http://$website;'

Input website:
helsinki.fi
Searching..
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>301 Moved Permanently</title>
</head><body>
<h1>Moved Permanently</h1>
<p>The document has moved <a href="http://www.helsinki.fi/">here</a>.</p>
</body></html>



<h3>1.5 - see, the pictures in the folder ./1.5 </h3>
devopsdockeruh/simple-web-service   ubuntu: 83 MB
devopsdockeruh/simple-web-service   alpine: 15.7MB



<h3>1.6</h3>
$ docker run -it devopsdockeruh/pull_exercise
Give me the password: basics
You found the correct password. Secret message is:
"This is the secret message"



<h3>1.7 - see, the picture in the folder ./1.7</h3>

Dockerfile: 

FROM devopsdockeruh/simple-web-service:alpine
CMD ["/bin/sh"]


Command: $ docker run web-server server



<h3>1.8 - see, the picture in the folder ./1.8</h3>

Dockerfile: 

FROM ubuntu:18.04
RUN apt-get update && apt-get install -y curl 
COPY web-curl.sh .
CMD ./web-curl.sh


Command: $ docker run -it curler



<h3>1.9 - see, the picture in the folder ./1.9</h3>
touch /home/epylkkan/tmp/text.log
docker run -v /home/epylkkan/tmp/text.log:/usr/src/app/text.log devopsdockeruh/simple-web-service



<h3>1.10 - see, the picture in the folder ./1.10</h3>
docker run -p 8080:8080 web-server server



<h3>1.11 - see, the picture in the folder ./1.11</h3>

Dockerfile: 

FROM openjdk:8
COPY spring-example-project .
WORKDIR .
RUN ./mvnw package
CMD java -jar ./target/docker-example-1.1.3.jar
EXPOSE 8080


Commands:
$ docker build . -t spring-example-project
$ docker run -it -p 8080:8080 spring-example-project



<h3>1.12 - see, the picture in the folder ./1.12</h3>

Dockerfile: 

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


Commands: 
$ docker build . -t front
$ docker run  -it -p 5000:5000 front



<h3>1.13 - see, the picture in the folder ./1.13</h3>

Dockerfile: 

FROM openjdk:8
ENV REQUEST_ORIGIN=http://localhost:5000
WORKDIR .
COPY example-backend .
RUN wget https://golang.org/dl/go1.16.5.linux-amd64.tar.gz
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.5.linux-amd64.tar.gz
RUN export PATH=$PATH:/usr/local/go/bin
CMD ./server


Commands:
$ docker build . -t back
$ docker run -it -p 8080:8080 back



<h3>1.14 - see, the picture in the folder ./1.14</h3>

Commands: 
$ docker run -it -p 5000:5000 front
$ docker run -it -p 8080:8080 back



<h3>1.15</h3>

Docker Hub: 
https://hub.docker.com/repository/docker/epylkkan/training_docker_devops -> tube 


Dockerfile:

FROM ubuntu:20.04
WORKDIR .
RUN apt-get update && apt-get install -y curl python 
RUN curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl 
RUN chmod a+x /usr/local/bin/youtube-dl 
ENV LC_ALL=C.UTF-8
ENTRYPOINT ["/usr/local/bin/youtube-dl"]

Readme:
Download files to your container 
Usage: docker run epylkkan/training_docker_devops:tube <URI> 
For example: $ docker run epylkkan/training_docker_devops:tube https://imgur.com/JY5tHqr



<h3>1.16</h3>

URL: https://dockerdevops116.herokuapp.com/

STEPS:

// application devopsdockeruh/heroku-example pulled from Docker Hub, own application name is 'dockerdevops116'
// heroku cli installation to Ubuntu 20.04 WSL2: curl https://cli-assets.heroku.com/install.sh | sh
// see, https://stackoverflow.com/questions/62380637/how-to-install-heroku-cli-on-wsl-2

heroku login

// tag the pulled image as registry.heroku.com/dockerdevops116/web
docker image tag devopsdockeruh/heroku-example registry.heroku.com/dockerdevops116/web

// Log in to Container Registry
heroku container:login

// Push Docker app
docker image push registry.heroku.com/dockerdevops116/web

// Deploy
heroku container:release web -a dockerdevops116

// URL: https://dockerdevops116.herokuapp.com/


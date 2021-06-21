FROM ubuntu

COPY ./script.sh ./

# docker-compose.yml in the container
COPY ./docker-compose-yml-to-container ./docker-compose.yml

# install git and docker
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

# install docker-compose in the container
RUN curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

CMD bash ./script.sh

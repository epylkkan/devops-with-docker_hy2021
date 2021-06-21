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



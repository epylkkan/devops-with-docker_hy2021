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



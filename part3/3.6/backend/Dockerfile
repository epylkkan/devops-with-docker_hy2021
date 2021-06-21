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

#RUN apk update && apk add ca-certificates // not used as this adds 0.5 MB 
RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/* $HOME/.cache && \
    rm -rf /var/lib/apt/lists/* && \
    adduser -D appuser && \
    chown appuser .

USER appuser

WORKDIR /
COPY --from=build-env /example-backend/server /

CMD /server

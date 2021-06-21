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

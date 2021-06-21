FROM openjdk:8

ENV REQUEST_ORIGIN=http://localhost:5000

WORKDIR .
COPY example-backend .
RUN wget https://golang.org/dl/go1.16.5.linux-amd64.tar.gz
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.16.5.linux-amd64.tar.gz
RUN export PATH=$PATH:/usr/local/go/bin

CMD ./server

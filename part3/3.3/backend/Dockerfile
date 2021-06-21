FROM openjdk:8

ENV REQUEST_ORIGIN=http://localhost:5000

#WORKDIR ./backend
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

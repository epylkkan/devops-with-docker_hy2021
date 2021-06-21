FROM openjdk:8 AS build-env

WORKDIR .
COPY ./spring-example-project .
RUN chmod +x mvnw
RUN ./mvnw package
RUN chmod +x ./target/docker-example-1.1.3.jar

FROM openjdk:8-jre-alpine
WORKDIR /
COPY --from=build-env "./target/docker-example-1.1.3.jar" .

EXPOSE 8080
CMD java -jar ./docker-example-1.1.3.jar

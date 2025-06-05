FROM gradle:8.4-jdk21 AS build
COPY . /home/app
WORKDIR /home/app
RUN gradle build --no-daemon

FROM eclipse-temurin:21-jdk
COPY --from=build /home/app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

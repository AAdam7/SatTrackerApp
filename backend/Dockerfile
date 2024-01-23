FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/demo-0.0.1-SNAPSHOT.jar satapp.jar
ENTRYPOINT ["java","-jar","/satapp.jar"]

# backend/Dockerfile
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY target/clinical-management-system-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

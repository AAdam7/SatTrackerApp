### BackEnd
1. Install backend `mvn clean package` (only for build jar/package first time, skip this step normally)
2. Run backend `mvn spring-boot:run`

You should see the API on http://localhost:1256/

### Docker
1. Run project `docker-compose up`

(If needed, build docker image and jar with `mvn spring-boot:build-image`)
```bash
npm i

npm run init-project

chmod u+x ./mvnw

./mvnw clean package -DskipTests

chmod u+x ./bin/generate-samples.sh

./bin/generate-samples.sh bin/configs/deno-oak-server-petstore.yaml

npm run format-sample-deno-server-petstore
```

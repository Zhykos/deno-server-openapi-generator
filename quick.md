```bash
npm i

npm run init-project

chmod u+x ./mvnw

./mvnw clean package -DskipTests

chmod u+x ./bin/generate-samples.sh

./bin/generate-samples.sh bin/configs/deno-oak-server-petstore.yaml

npm run format-sample-deno-server-petstore

cd samples/server/petstore/deno/oak/tests/petstore/

deno run --allow-net --allow-write PetStoreCompleteExample.ts

Import into Postman collections: modules/openapi-generator/src/test/postman/deno-server/
```

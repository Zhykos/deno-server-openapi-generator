FROM denoland/deno:alpine

RUN mkdir /petstore
ADD ./ /petstore/

EXPOSE 3000

CMD /bin/deno run --allow-net --allow-write /petstore/tests/petstore/PetStoreCompleteExample.ts
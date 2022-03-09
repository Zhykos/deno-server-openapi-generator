const https = require("follow-redirects").https;
const fs = require("fs");
const AdmZip = require("adm-zip");

const file = fs.createWriteStream("openapi-generator.zip");
https.get(
  "https://github.com/OpenAPITools/openapi-generator/archive/refs/tags/v5.4.0.zip",
  (response) => {
    response.pipe(file);

    response.on("end", () => {
      try {
        console.log("File downloaded.");

        const zip = new AdmZip("./openapi-generator.zip");
        const zipEntries = zip.getEntries();

        zipEntries.forEach(function (zipEntry) {
          const targetFileOrDir =
            "./" +
            zipEntry.entryName.substring(zipEntry.entryName.indexOf("/") + 1);
          if (
            fs.existsSync(targetFileOrDir) &&
            fs.lstatSync(targetFileOrDir).isFile()
          ) {
            console.log("File already exists: " + targetFileOrDir);
          } else {
            console.log("Writing: " + targetFileOrDir);
            if (zipEntry.isDirectory) {
              fs.mkdirSync(targetFileOrDir, { recursive: true });
            } else {
              const fileContent = zipEntry.getData().toString("utf8");
              fs.writeFileSync(targetFileOrDir, fileContent);
            }
          }
        });

        console.log("Update org.openapitools.codegen.CodegenConfig");
        fs.appendFileSync('./modules/openapi-generator/src/main/resources/META-INF/services/org.openapitools.codegen.CodegenConfig', 'org.openapitools.codegen.languages.DenoOakServerCodegen');
      } catch (e) {
        console.error(e.message);
      }
    });
  }
);

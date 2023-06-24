/*
 * Copyright 2023 Thomas "Zhykos" Cicognani
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import pkg from "follow-redirects";
const { https } = pkg;
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  writeFileSync,
  appendFileSync,
} from "fs";
import AdmZip from "adm-zip";
import { SingleBar, Presets } from "cli-progress";
import ora from "ora";

const openapiGeneratorURL =
  "https://github.com/OpenAPITools/openapi-generator/archive/refs/tags/v6.6.0.zip";

const file = createWriteStream("openapi-generator.zip");
const spinner = ora("Downloading file: " + openapiGeneratorURL).start();
https.get(openapiGeneratorURL, (response) => {
  response.pipe(file);

  response.on("end", () => {
    try {
      spinner.stop();
      const zip = new AdmZip("./openapi-generator.zip");
      const zipEntries = zip.getEntries();

      console.log("Unzipping file:");
      const zipEntriesBar = new SingleBar({}, Presets.shades_classic);
      zipEntriesBar.start(zipEntries.length, 0);

      zipEntries.forEach(function (zipEntry) {
        const targetFileOrDir =
          "./" +
          zipEntry.entryName.substring(zipEntry.entryName.indexOf("/") + 1);
        if (!existsSync(targetFileOrDir)) {
          if (zipEntry.isDirectory) {
            mkdirSync(targetFileOrDir, { recursive: true });
          } else {
            const fileContent = zipEntry.getData().toString("utf8");
            writeFileSync(targetFileOrDir, fileContent);
          }
        }
        zipEntriesBar.increment(1);
      });
      zipEntriesBar.stop();

      console.log("Updating org.openapitools.codegen.CodegenConfig...");
      appendFileSync(
        "./modules/openapi-generator/src/main/resources/META-INF/services/org.openapitools.codegen.CodegenConfig",
        "org.openapitools.codegen.languages.DenoOakServerCodegen"
      );
    } catch (e) {
      console.error(e.message);
    }
  });
});

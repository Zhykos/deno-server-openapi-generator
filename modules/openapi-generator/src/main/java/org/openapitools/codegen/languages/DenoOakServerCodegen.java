/*
 * Copyright 2022 Thomas "Zhykos" Cicognani
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

package org.openapitools.codegen.languages;

import java.io.File;

import org.openapitools.codegen.SupportingFile;

public class DenoOakServerCodegen extends AbstractDenoServerCodegen {

    private static final String DENO_OAK_SERVER = "deno-oak";
    private static final String MIDDLEWARE_FOLDER = "middlewares" + File.separator + "oak";

    public DenoOakServerCodegen() {
        super();
        super.outputFolder = "generated-code" + File.separator + DENO_OAK_SERVER;

        // Files to add in the root folder
        super.supportingFiles.add(
                new SupportingFile(MIDDLEWARE_FOLDER + File.separator + "DenoOakServer.mustache", "",
                        "DenoOakServer.ts"));
        super.supportingFiles
                .add(new SupportingFile(MIDDLEWARE_FOLDER + File.separator + "deps.mustache", "",
                        "deps-oak.ts"));

        // Files to add in the controllers folder
        super.supportingFiles
                .add(new SupportingFile(
                        MIDDLEWARE_FOLDER + File.separator + "OakOpenApiRequestModel.mustache",
                        CONTROLLERS_FOLDER_NAME, "OakOpenApiRequestModel.ts"));
    }

    @Override
    public String getName() {
        return DENO_OAK_SERVER;
    }

    @Override
    public String getHelp() {
        return "Generates a Deno oak based server.";
    }

}

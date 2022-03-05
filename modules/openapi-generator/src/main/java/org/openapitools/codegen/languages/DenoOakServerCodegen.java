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
        super.supportingFiles.add(new SupportingFile(MIDDLEWARE_FOLDER + File.separator + "DenoOakServer.mustache", "",
                "DenoOakServer.ts"));
        super.supportingFiles
                .add(new SupportingFile(MIDDLEWARE_FOLDER + File.separator + "DenoOakPetStoreExample.mustache", "",
                        "DenoOakPetStoreExample.ts"));
        super.supportingFiles
                .add(new SupportingFile(MIDDLEWARE_FOLDER + File.separator + "deps.mustache", "", "deps-oak.ts"));

        // Files to add in the controllers folder
        super.supportingFiles
                .add(new SupportingFile(MIDDLEWARE_FOLDER + File.separator + "OakOpenApiRequest.mustache",
                        CONTROLLERS_FOLDER_NAME, "OakOpenApiRequest.ts"));
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

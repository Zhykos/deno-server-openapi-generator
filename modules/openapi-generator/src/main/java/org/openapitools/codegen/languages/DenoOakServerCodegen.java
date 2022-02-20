package org.openapitools.codegen.languages;

import java.io.File;

import org.openapitools.codegen.SupportingFile;

public class DenoOakServerCodegen extends AbstractDenoServerCodegen {

    private static final String DENO_OAK_SERVER = "deno-oak";

    public DenoOakServerCodegen() {
        super();
        super.outputFolder = "generated-code" + File.separator + DENO_OAK_SERVER;

        // root folder
        super.supportingFiles
                .add(new SupportingFile(
                        "middlewares" + File.separator + "oak" + File.separator + "DenoOakServer.mustache", "",
                        "DenoOakServer.ts"));
        super.supportingFiles
                .add(new SupportingFile(
                        "middlewares" + File.separator + "oak" + File.separator
                                + "DenoOakPetStoreExample.mustache",
                        "", "DenoOakPetStoreExample.ts"));
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

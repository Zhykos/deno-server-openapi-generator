package org.openapitools.codegen.languages;

import java.io.File;

public class DenoOakServerCodegen extends AbstractDenoServerCodegen {

    private static final String DENO_OAK_SERVER = "deno-oak";

    public DenoOakServerCodegen() {
        super();
        super.outputFolder = "generated-code" + File.separator + DENO_OAK_SERVER;
        // super.embeddedTemplateDir = super.templateDir = DENO_OAK_SERVER;
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

package org.openapitools.codegen.deno;

import org.openapitools.codegen.languages.DenoOakServerCodegen;
import org.testng.Assert;
import org.testng.annotations.Test;

public class DenoOakServerCodegenTest {

    private final DenoOakServerCodegen codegen = new DenoOakServerCodegen();

    @Test
    public void getName() {
        final String name = this.codegen.getName();
        Assert.assertEquals(name, "deno-oak");
    }

    @Test
    public void getHelp() {
        final String help = this.codegen.getHelp();
        Assert.assertEquals(help, "Generates a Deno oak based server.");
    }

}

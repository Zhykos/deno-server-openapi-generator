package org.openapitools.codegen.deno;

import org.openapitools.codegen.CodegenType;
import org.openapitools.codegen.languages.AbstractDenoServerCodegen;
import org.testng.annotations.Test;
import org.testng.Assert;

public class DenoServerCodegenTest {

    private final AbstractDenoServerCodegen codegen = new AbstractDenoServerCodegen() {
        // Do nothing
    };

    @Test
    public void isServerCodegen() {
        final CodegenType tag = codegen.getTag();
        Assert.assertEquals(tag, CodegenType.SERVER);
    }

}

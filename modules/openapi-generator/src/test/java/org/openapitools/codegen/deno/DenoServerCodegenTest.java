package org.openapitools.codegen.deno;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mockito.Mockito;
import org.openapitools.codegen.CodegenModel;
import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.CodegenProperty;
import org.openapitools.codegen.CodegenType;
import org.openapitools.codegen.languages.AbstractDenoServerCodegen;
import org.testng.Assert;
import org.testng.annotations.Test;

import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.media.StringSchema;

public class DenoServerCodegenTest {

    private final AbstractDenoServerCodegen codegen = new AbstractDenoServerCodegen() {
        // Do nothing
    };

    @Test
    public void isServerCodegen() {
        final CodegenType tag = this.codegen.getTag();
        Assert.assertEquals(tag, CodegenType.SERVER);
    }

    @Test
    public void postProcessAllModels() {
        // Given:
        final Map<String, Object> objs = new HashMap<>();

        final Map<String, Object> inner = new HashMap<>();
        objs.put("foo", inner);

        final List<Map<String, Object>> models = new ArrayList<>();
        inner.put("models", models);

        final Map<String, Object> model = new HashMap<>();
        models.add(model);

        final CodegenModel codegenModel = new CodegenModel();
        codegenModel.imports.add("java.lang.foo");
        model.put("model", codegenModel);

        final CodegenProperty property = new CodegenProperty();
        property.isEnum = true;
        property.enumName = "fooEnum";
        codegenModel.vars.add(property);

        // Where:
        final Map<String, Object> result = this.codegen.postProcessAllModels(objs);

        // Then:
        Assert.assertEquals(result.size(), 1);

        @SuppressWarnings("unchecked")
        final Map<String, Object> innerResult = (Map<String, Object>) result.get("foo");
        @SuppressWarnings("unchecked")
        final List<Map<String, Object>> modelsResult = (List<Map<String, Object>>) innerResult.get("models");
        Assert.assertEquals(modelsResult.size(), 1);
        final Map<String, Object> modelResult = modelsResult.get(0);
        @SuppressWarnings("unchecked")
        final List<Map<String, String>> tsImports = (List<Map<String, String>>) modelResult.get("tsImports");
        Assert.assertEquals(tsImports.size(), 1);
        final Map<String, String> tsImport = tsImports.get(0);
        Assert.assertEquals(tsImport.get("classname"), "java.lang.foo");
        Assert.assertEquals(tsImport.get("filename"), this.codegen.toModelFilename("java.lang.foo"));

        final List<CodegenProperty> properties = codegenModel.vars;
        Assert.assertEquals(properties.size(), 1);
        final CodegenProperty propertyResult = properties.get(0);
        Assert.assertTrue(propertyResult.isEnum);
        Assert.assertEquals(propertyResult.datatypeWithEnum, "fooEnum");
    }

    @Test
    public void apiPackage() {
        final String apiPackage = this.codegen.apiPackage();
        Assert.assertEquals(apiPackage, "controllers");
    }

    @Test
    public void toApiNameEmpty() {
        final String apiName = this.codegen.toApiName("");
        Assert.assertEquals(apiName, "Default");
    }

    @Test
    public void toApiName() {
        final String apiName = this.codegen.toApiName("foo");
        Assert.assertEquals(apiName, "Foo");
    }

    @Test
    public void toApiFilename() {
        final String apiNameFilename = this.codegen.toApiFilename("foo");
        Assert.assertEquals(apiNameFilename, "FooController");
    }

    @Test
    public void apiFilename() {
        final String apiFilename = this.codegen.apiFilename("controller.mustache", "pet");
        Assert.assertEquals(apiFilename, File.separator + "controllers" + File.separator + "PetController.ts");
    }

    @Test
    public void apiFilenameService() {
        final String apiFilename = this.codegen.apiFilename("service.mustache", "pet");
        Assert.assertEquals(apiFilename, File.separator + "services" + File.separator + "PetPrivateService.ts");
    }

    @Test
    public void apiFilenameUserService() {
        final String apiFilename = this.codegen.apiFilename("iservice.mustache", "pet");
        Assert.assertEquals(apiFilename, File.separator + "services" + File.separator + "PetService.ts");
    }

    @Test
    public void apiFileFolder() {
        final String apiFileFolder = this.codegen.apiFileFolder();
        Assert.assertEquals(apiFileFolder, File.separator + "controllers");
    }

    @Test
    public void toDefaultValueNull() {
        final Schema<?> schema = Mockito.mock(Schema.class);
        final String toDefaultValue = this.codegen.toDefaultValue(schema);
        Assert.assertNull(toDefaultValue);
    }

    @Test
    public void toDefaultValue() {
        // Given:
        final StringSchema schema = Mockito.mock(StringSchema.class);
        Mockito.doReturn("foo").when(schema).getDefault();

        // Where:
        final String toDefaultValue = this.codegen.toDefaultValue(schema);

        // Then:
        Assert.assertEquals(toDefaultValue, "'foo'");
    }

    @Test
    public void overrideOperationsOrder() {
        // Given:
        final Map<String, Object> objs = new HashMap<>();
        final List<Object> allModels = Collections.emptyList();

        final Map<String, Object> operations = new HashMap<>();
        objs.put("operations", operations);

        final List<CodegenOperation> operation = new ArrayList<>();
        operations.put("operation", operation);

        final CodegenOperation operation1 = new CodegenOperation();
        operation1.path = "{foo}";
        operation.add(operation1);

        final CodegenOperation operation2 = new CodegenOperation();
        operation2.path = "zzz";
        operation.add(operation2);

        final CodegenOperation operation3 = new CodegenOperation();
        operation3.path = "foo";
        operation.add(operation3);

        final CodegenOperation operation4 = new CodegenOperation();
        operation4.path = "{zzz}";
        operation.add(operation4);

        // Where:
        final Map<String, Object> overrideOperationsOrder = this.codegen.postProcessOperationsWithModels(objs,
                allModels);

        // Then:
        @SuppressWarnings("unchecked")
        final Map<String, Object> operationsResults = (Map<String, Object>) overrideOperationsOrder.get("operations");
        @SuppressWarnings("unchecked")
        final List<CodegenOperation> operationListResults = (List<CodegenOperation>) operationsResults.get("operation");
        Assert.assertEquals(operationListResults.size(), 4);
        Assert.assertEquals(operationListResults.stream().map(op -> op.path).toArray(String[]::new),
                new String[] { "foo", "zzz", "{foo}", "{zzz}" });
    }

}

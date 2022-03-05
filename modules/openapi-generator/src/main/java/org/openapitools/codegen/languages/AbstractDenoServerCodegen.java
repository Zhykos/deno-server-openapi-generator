package org.openapitools.codegen.languages;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.openapitools.codegen.CodegenModel;
import org.openapitools.codegen.CodegenProperty;
import org.openapitools.codegen.CodegenType;
import org.openapitools.codegen.SupportingFile;
import org.openapitools.codegen.meta.GeneratorMetadata;
import org.openapitools.codegen.meta.Stability;
import org.openapitools.codegen.templating.mustache.LowercaseLambda;
import org.openapitools.codegen.utils.StringUtils;

import io.swagger.v3.oas.models.media.Schema;

public abstract class AbstractDenoServerCodegen extends AbstractTypeScriptClientCodegen {

    private static final String DENO_SERVER = "deno-server";
    private static final String SERVICES_FOLDER_NAME = "services";
    private static final String CONTROLLERS_FOLDER_NAME = "controllers";

    @Override
    public CodegenType getTag() {
        return CodegenType.SERVER;
    }

    protected AbstractDenoServerCodegen() {
        super();

        super.generatorMetadata = GeneratorMetadata.newBuilder(generatorMetadata).stability(Stability.BETA).build();

        super.modelTemplateFiles.put("model.mustache", ".ts");
        super.apiTemplateFiles.put("controller.mustache", ".ts");
        super.apiTemplateFiles.put("service.mustache", ".ts");
        super.apiTemplateFiles.put("iservice.mustache", ".ts");
        super.embeddedTemplateDir = super.templateDir = DENO_SERVER;
        super.modelPackage = "models";
        super.additionalProperties.put("implFolder", SERVICES_FOLDER_NAME);

        // Root folder
        super.supportingFiles.add(new SupportingFile("config.mustache", "", "config.ts"));
        super.supportingFiles.add(new SupportingFile("README.mustache", "", "README.md"));
        super.supportingFiles.add(new SupportingFile("deps.mustache", "", "deps.ts"));
        super.supportingFiles.add(new SupportingFile("DenoServer.mustache", "", "DenoServer.ts"));

        // Controllers folder
        super.supportingFiles.add(new SupportingFile(CONTROLLERS_FOLDER_NAME + File.separator + "controller.mustache",
                CONTROLLERS_FOLDER_NAME, "Controller.ts"));
        super.supportingFiles
                .add(new SupportingFile(CONTROLLERS_FOLDER_NAME + File.separator + "OpenApiRequestModel.mustache",
                        CONTROLLERS_FOLDER_NAME, "OpenApiRequestModel.ts"));

        // Tests folder
        super.supportingFiles
                .add(new SupportingFile("tests" + File.separator + "DenoPetStoreExampleRouteTests.mustache",
                        "tests", "DenoPetStoreExampleRouteTests.ts"));

        // Additional properties
        super.additionalProperties.put("lowercase", new LowercaseLambda());
    }

    @Override
    public Map<String, Object> postProcessAllModels(final Map<String, Object> objs) {
        final Map<String, Object> result = super.postProcessAllModels(objs);

        for (final Map.Entry<String, Object> entry : result.entrySet()) {
            final Map<String, Object> inner = (Map<String, Object>) entry.getValue();
            final List<Map<String, Object>> models = (List<Map<String, Object>>) inner.get("models");
            for (final Map<String, Object> mo : models) {
                final CodegenModel cm = (CodegenModel) mo.get("model");
                mo.put("tsImports", toTsImports(cm, cm.imports));
                updateEnumQualifiedName(cm);
            }
        }
        return result;
    }

    private static void updateEnumQualifiedName(final CodegenModel cm) {
        for (final CodegenProperty property : cm.vars) {
            if (property.isEnum) {
                final String enumName = property.enumName;
                property.datatypeWithEnum = enumName;
            }
        }
    }

    private List<Map<String, String>> toTsImports(final CodegenModel cm, final Set<String> imports) {
        final List<Map<String, String>> tsImports = new ArrayList<>();
        for (final String im : imports) {
            if (!im.equals(cm.classname)) {
                final Map<String, String> tsImport = new HashMap<>();
                tsImport.put("classname", im);
                tsImport.put("filename", toModelFilename(im));
                tsImports.add(tsImport);
            }
        }
        return tsImports;
    }

    @Override
    public String apiPackage() {
        return CONTROLLERS_FOLDER_NAME;
    }

    @Override
    public String toApiName(final String name) {
        if (name.length() == 0) {
            return "Default";
        }
        return StringUtils.camelize(name);
    }

    @Override
    public String toApiFilename(final String name) {
        return toApiName(name) + "Controller";
    }

    @Override
    public String apiFilename(final String templateName, final String tag) {
        String sourceFullPath = super.apiFilename(templateName, tag);
        if ("service.mustache".equals(templateName)) {
            final String targetPath = File.separator + SERVICES_FOLDER_NAME + File.separator;
            sourceFullPath = modifyApiFilename(sourceFullPath, targetPath, "PrivateService.ts");
        } else if ("iservice.mustache".equals(templateName)) {
            final String targetPath = File.separator + SERVICES_FOLDER_NAME + File.separator;
            sourceFullPath = modifyApiFilename(sourceFullPath, targetPath, "Service.ts");
        }
        return sourceFullPath;
    }

    private static String modifyApiFilename(final String sourceFullPath, final String targetPath,
            final String targetFilename) {
        final String sourcePath = File.separator + CONTROLLERS_FOLDER_NAME + File.separator;
        return sourceFullPath.replace(sourcePath, targetPath).replace("Controller.ts", targetFilename);
    }

    @Override
    public String apiFileFolder() {
        return outputFolder + File.separator + apiPackage().replace('.', File.separatorChar);
    }

    @Override
    public String toDefaultValue(final Schema schema) {
        String def = super.toDefaultValue(schema);
        if ("undefined".equals(def)) {
            return null;
        }
        return def;
    }

}

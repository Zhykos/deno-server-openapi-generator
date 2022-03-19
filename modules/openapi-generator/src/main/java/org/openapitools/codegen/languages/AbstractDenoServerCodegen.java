package org.openapitools.codegen.languages;

import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import com.samskivert.mustache.Mustache;
import com.samskivert.mustache.Template;

import org.openapitools.codegen.CodegenModel;
import org.openapitools.codegen.CodegenOperation;
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
    private static final String TESTS_FOLDER_NAME = "tests";
    private static final String OBJ_NAME_BODY = "objBody";

    protected static final String CONTROLLERS_FOLDER_NAME = "controllers";

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
        super.supportingFiles
                .add(new SupportingFile(CONTROLLERS_FOLDER_NAME + File.separator + "helpers.mustache",
                        CONTROLLERS_FOLDER_NAME, "Helpers.ts"));

        // Additional properties
        super.additionalProperties.put("lowercase", new LowercaseLambda());
        super.additionalProperties.put("castForType", new CastForTypeLambda());
        super.additionalProperties.put("paramNameDestructuring", new ParamNameDestructuringLambda());
    }

    @Override
    @SuppressWarnings("unchecked")
    public Map<String, Object> postProcessAllModels(final Map<String, Object> objs) {
        final Map<String, Object> result = super.postProcessAllModels(objs);

        result.values().stream().map(val -> (Map<String, Object>) val).forEach(inner -> {
            final List<Map<String, Object>> models = (List<Map<String, Object>>) inner.get("models");
            models.forEach(model -> {
                final CodegenModel codegenModel = (CodegenModel) model.get("model");
                model.put("tsImports", toTsImports(codegenModel));
                updateEnumQualifiedName(codegenModel);
            });
        });
        return result;
    }

    private static void updateEnumQualifiedName(final CodegenModel cm) {
        cm.vars.stream().filter(property -> property.isEnum)
                .forEach(property -> property.datatypeWithEnum = property.enumName);
    }

    private List<Map<String, String>> toTsImports(final CodegenModel codegenModel) {
        return codegenModel.imports.stream().filter(importt -> !importt.equals(codegenModel.classname))
                .map(this::importStringToImportMap).collect(Collectors.toList());
    }

    private Map<String, String> importStringToImportMap(final String importt) {
        return Map.of("classname", importt, "filename", toModelFilename(importt));
    }

    @Override
    public String apiPackage() {
        return CONTROLLERS_FOLDER_NAME;
    }

    @Override
    public String toApiName(final String name) {
        if (name.isEmpty()) {
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
    @SuppressWarnings("rawtypes")
    public String toDefaultValue(final Schema schema) {
        String def = super.toDefaultValue(schema);
        if ("undefined".equals(def)) {
            return null;
        }
        return def;
    }

    @Override
    public Map<String, Object> postProcessOperationsWithModels(final Map<String, Object> objs,
            final List<Object> allModels) {
        overrideOperationsOrder(objs);
        return super.postProcessOperationsWithModels(objs, allModels);
    }

    private static void overrideOperationsOrder(final Map<String, Object> objs) {
        @SuppressWarnings("unchecked")
        final Map<String, Object> operations = (Map<String, Object>) objs.get("operations");
        @SuppressWarnings("unchecked")
        final List<CodegenOperation> operationList = (List<CodegenOperation>) operations.get("operation");
        Collections.sort(operationList, (op1, op2) -> {
            final String path1 = op1.path;
            final String path2 = op2.path;
            final int result;
            if (path1.contains("{") && path2.contains("{")) {
                result = path1.compareTo(path2);
            } else if (path1.contains("{")) {
                result = 1;
            } else if (path2.contains("{")) {
                result = -1;
            } else {
                result = path1.compareTo(path2);
            }
            return result;
        });
    }

    private class CastForTypeLambda implements Mustache.Lambda {
        @Override
        public void execute(final Template.Fragment fragment, final Writer writer) throws IOException {
            final String text = fragment.execute();
            final boolean isRequired = !text.startsWith("?");
            final String generatedText;
            if (isRequired) {
                generatedText = text;
            } else {
                generatedText = text.substring(1);
            }
            final String[] split = generatedText.split("---");
            final String valueType = split[0];
            final String valueName = split[1];
            if ("number".equals(valueType) || "string".equals(valueType)) {
                final StringBuilder builder = new StringBuilder();
                if (!isRequired) {
                    builder.append(valueName + " === undefined ? undefined : ");
                }
                builder.append(valueType.substring(0, 1).toUpperCase(Locale.ROOT)
                        + valueType.substring(1).toLowerCase(Locale.ROOT) + '(' + valueName + ')');
                writer.write(builder.toString());
            } else if ("any".equals(valueType)) {
                writer.write(valueName);
            } else if (valueType.startsWith("Array")) {
                writer.write("this.fillArray(");
                if (valueType.contains("<number>") || valueType.contains("<string>") || valueType.contains("<any>")
                        || valueType.contains("<\"") || valueType.contains("<'")) {
                    writer.write(valueName);
                } else {
                    writer.write(OBJ_NAME_BODY);
                }
                writer.write(");");
            } else {
                writer.write("new " + valueType + "(); " + valueName + "Cast.copyFrom(" + OBJ_NAME_BODY + ");");
            }
        }
    }

    private class ParamNameDestructuringLambda implements Mustache.Lambda {
        @Override
        public void execute(final Template.Fragment fragment, final Writer writer) throws IOException {
            final String text = fragment.execute();
            final String[] split = text.split("---");
            final String valueType = split[0];
            final String valueName = split[1];
            if ("number".equals(valueType) || "string".equals(valueType) || "any".equals(valueType)) {
                writer.write(valueName);
            } else if (valueType.startsWith("Array")) {
                if (valueType.contains("<number>") || valueType.contains("<string>") || valueType.contains("<any>")
                        || valueType.contains("<\"") || valueType.contains("<'")) {
                    writer.write(valueName);
                } else {
                    writer.write(OBJ_NAME_BODY);
                }
            } else {
                writer.write(OBJ_NAME_BODY);
            }
        }
    }

}
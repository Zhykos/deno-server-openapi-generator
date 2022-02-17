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
import org.openapitools.codegen.utils.StringUtils;

import io.swagger.v3.oas.models.media.Schema;

public class DenoOakServerCodegen extends AbstractTypeScriptClientCodegen {

    private static final String DENO_OAK = "deno-oak";

    @Override
    public CodegenType getTag() {
        return CodegenType.SERVER;
    }

    @Override
    public String getName() {
        return DENO_OAK;
    }

    @Override
    public String getHelp() {
        return "Generates a Deno based oak server.";
    }

    public DenoOakServerCodegen() {
        super();

        super.generatorMetadata = GeneratorMetadata.newBuilder(generatorMetadata).stability(Stability.BETA).build();

        super.outputFolder = "generated-code" + File.separator + DENO_OAK;
        super.modelTemplateFiles.put("model.mustache", ".ts");
        super.apiTemplateFiles.put("controller.mustache", ".ts");
        super.apiTemplateFiles.put("service.mustache", ".ts");
        super.embeddedTemplateDir = super.templateDir = DENO_OAK;
        super.modelPackage = "models";

        super.supportingFiles.add(new SupportingFile("config.mustache", "", "config.ts"));
        super.supportingFiles.add(new SupportingFile("README.mustache", "", "README.md"));

        // controllers folder
        super.supportingFiles
                .add(new SupportingFile("controllers" + File.separator + "index.mustache", "controllers", "index.ts"));
        super.supportingFiles.add(new SupportingFile("controllers" + File.separator + "controller.mustache",
                "controllers", "Controller.ts"));

        // service folder
        super.supportingFiles.add(new SupportingFile("services" + File.separator + "index.mustache", "services", "index.ts"));

        super.additionalProperties.put("implFolder", "services");
    }

    /* Copied from TypeScriptNodeClientCodegen */
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

    /* Copied from TypeScriptNodeClientCodegen */
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
        return "controllers";
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
        String result = super.apiFilename(templateName, tag);
        if (templateName.equals("service.mustache")) {
            final String stringToMatch = File.separator + "controllers" + File.separator;
            final String replacement = File.separator + "services" + File.separator;
            result = result.replace(stringToMatch, replacement).replace("Controller.ts", "Service.ts");
        }
        return result;
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

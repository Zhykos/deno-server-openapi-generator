import { camelCaseSync, join } from "../deps.ts";
import { config } from "../config.ts";
import {
  OpenApiRequest,
  ParameterObject,
  SchemaObject,
} from "./OpenApiRequestModel.ts";

export class Controller {
  static sendResponse(body: any): Response {
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  static sendError(error: Error): Response {
    let status = 500;
    if (error instanceof Deno.errors.NotFound) {
      status = 404;
    } else if (error instanceof Deno.errors.InvalidData) {
      status = 400;
    }
      return new Response(JSON.stringify({
        message: error.message
      }), {
        status: status,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      });
    }
    // return new Response(error, {
    //   status: 500,
    //   headers: {
    //     "content-type": "application/json; charset=utf-8",
    //   },
    // });

  /**
   * Files have been uploaded to the directory defined by config.js as upload directory
   * Files have a temporary name, that was saved as 'filename' of the file object that is
   * referenced in request.files array.
   * This method finds the file and changes it to the file name that was originally called
   * when it was uploaded. To prevent files from being overwritten, a timestamp is added between
   * the filename and its extension
   * @param request
   * @param fieldName
   * @returns {string}
   */
  private static collectFile(
    request: OpenApiRequest,
    fieldName: string
  ): string {
    /*let uploadedFileName = '';
    if (request.files && request.files.length > 0) {
      const fileObject = request.files.find((file: { fieldname: any; }) => file.fieldname === fieldName);
      if (fileObject) {
        const fileArray = fileObject.originalname.split('.');
        const extension = fileArray.pop();
        fileArray.push(`_${Date.now()}`);
        uploadedFileName = `${fileArray.join('')}.${extension}`;
        Deno.renameSync(join(config.FILE_UPLOAD_PATH, fileObject.filename),
          join(config.FILE_UPLOAD_PATH, uploadedFileName));
      }
    }
    return uploadedFileName;*/
    console.error("TODO: collectFile");
    throw "Cannot treat collecting file (collectFile).";
  }

  private static getRequestBodyName(request: OpenApiRequest): string {
    /*const codeGenDefinedBodyName = request.openapi.schema['x-codegen-request-body-name'];
    if (codeGenDefinedBodyName !== undefined) {
      return codeGenDefinedBodyName;
    }
    const refObjectPath = request.openapi.schema.requestBody.content['application/json'].schema.$ref;
    if (refObjectPath !== undefined && refObjectPath.length > 0) {
      return (refObjectPath.substr(refObjectPath.lastIndexOf('/') + 1));
    }
    return 'body';*/
    console.error("TODO: getRequestBodyName");
    throw "Cannot get request body name (getRequestBodyName).";
  }

  static collectRequestParams(request: OpenApiRequest): any {
    // console.log(request)
    const requestParams: any = {};
    if (
      request.openapi !== undefined &&
      request.openapi.schema.requestBody !== undefined
    ) {
      const { content } = request.openapi.schema.requestBody;
      if (content["application/json"] !== undefined) {
        const requestBodyName = camelCaseSync(this.getRequestBodyName(request));
        requestParams[requestBodyName] = request.body;
      } else if (
        content["multipart/form-data"] !== undefined &&
        content["multipart/form-data"].schema !== undefined &&
        content["multipart/form-data"].schema.properties !== undefined
      ) {
        const properties: { [name: string]: SchemaObject } =
          content["multipart/form-data"].schema.properties;
        Object.keys(properties).forEach((property) => {
          const propertyObject: SchemaObject = properties[property];
          if (
            propertyObject.format !== undefined &&
            propertyObject.format === "binary"
          ) {
            requestParams[property] = this.collectFile(request, property);
          } else if (request.body !== null) {
            //requestParams[property] = request.body[property];
            console.error("TODO: body property");
            requestParams[property] =
              "TODO: body property (collectRequestParams)";
          }
        });
      } else {
        throw "Cannot treat content other than a JSON or a Form-data content.";
      }
    }

    const openApi = request.openapi;
    if (
      openApi !== undefined &&
      openApi.schema !== undefined &&
      openApi.schema.parameters !== undefined
    ) {
      openApi.schema.parameters.forEach((param: ParameterObject) => {
        if (param.in === "path") {
          requestParams[param.name] = openApi.pathParams[param.name];
        } else if (param.in === "query") {
          //requestParams[param.name] = request.query[param.name];
          console.error("TODO: query param");
          requestParams[param.name] =
            "TODO: query param (collectRequestParams)";
        } else if (param.in === "header") {
          requestParams[param.name] = request.headers.get(param.name);
        }
      });
    }
    return requestParams;
  }

  /*static async handleRequest(request: OpenApiRequest, serviceOperation: Function): Promise<Response> {
    try {
      const serviceResponse = await serviceOperation(Controller.collectRequestParams(request));
      return Controller.sendResponse(serviceResponse);
    } catch (error) {
      return Controller.sendError(error);
    }
  }*/
}

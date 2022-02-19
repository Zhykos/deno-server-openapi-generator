import { camelCaseSync, join } from "../deps.ts";
import { config } from "../config.ts";
import { OpenApiRequest, ParameterObject } from "./OpenApiRequestModel.ts";

export class Controller {
  static sendResponse(body: any): Response {
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  static sendError(error: any): Response {
    return new Response(error, {
      status: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

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
  static collectFile(request: any, fieldName: any) {
    let uploadedFileName = "";
    if (request.files && request.files.length > 0) {
      const fileObject = request.files.find((file: { fieldname: any }) =>
        file.fieldname === fieldName
      );
      if (fileObject) {
        const fileArray = fileObject.originalname.split(".");
        const extension = fileArray.pop();
        fileArray.push(`_${Date.now()}`);
        uploadedFileName = `${fileArray.join("")}.${extension}`;
        Deno.renameSync(
          join(config.FILE_UPLOAD_PATH, fileObject.filename),
          join(config.FILE_UPLOAD_PATH, uploadedFileName),
        );
      }
    }
    return uploadedFileName;
  }

  static getRequestBodyName(request: any) {
    const codeGenDefinedBodyName =
      request.openapi.schema["x-codegen-request-body-name"];
    if (codeGenDefinedBodyName !== undefined) {
      return codeGenDefinedBodyName;
    }
    const refObjectPath =
      request.openapi.schema.requestBody.content["application/json"].schema
        .$ref;
    if (refObjectPath !== undefined && refObjectPath.length > 0) {
      return (refObjectPath.substr(refObjectPath.lastIndexOf("/") + 1));
    }
    return "body";
  }

  static collectRequestParams(request: OpenApiRequest) {
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
        content["multipart/form-data"].schema !== undefined
      ) {
        Object.keys(content["multipart/form-data"].schema.properties).forEach(
          (property) => {
            const propertyObject =
              content["multipart/form-data"].schema.properties[property];
            if (
              propertyObject.format !== undefined &&
              propertyObject.format === "binary"
            ) {
              requestParams[property] = this.collectFile(request, property);
            } else {
              requestParams[property] = request.body[property];
            }
          },
        );
      }
    }

    if (
      request.openapi !== undefined && request.openapi.schema !== undefined &&
      request.openapi.schema.parameters !== undefined
    ) {
      request.openapi.schema.parameters.forEach((param: ParameterObject) => {
        if (param.in === "path") {
          requestParams[param.name] = request.openapi.pathParams[param.name];
        } else if (param.in === "query") {
          requestParams[param.name] = request.query[param.name];
        } else if (param.in === "header") {
          requestParams[param.name] = request.headers[param.name];
        }
      });
    }
    return requestParams;
  }

  static async handleRequest(
    request: any,
    serviceOperation: any,
  ): Promise<Response> {
    try {
      const serviceResponse = await serviceOperation(
        Controller.collectRequestParams(request),
      );
      return Controller.sendResponse(serviceResponse);
    } catch (error) {
      return Controller.sendError(error);
    }
  }
}

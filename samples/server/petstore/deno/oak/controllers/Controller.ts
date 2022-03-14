import {
  OpenApiRequest,
  ParameterObject, /*, SchemaObject*/
} from "./OpenApiRequestModel.ts";
import { readAll, readerFromStreamReader } from "../deps.ts";

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
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: status,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      },
    );
  }

  static collectRequestParams(request: OpenApiRequest): any {
    const requestParams: any = {};
    if (request.hasBody) {
      const responseReader = request.body;
      if (responseReader) {
        // const reader: Deno.Reader = readerFromStreamReader(responseReader);
        // const charArray: Uint8Array = await readAll(reader);
        // const jsonObj = JSON.parse(new TextDecoder().decode(charArray));
        // requestParams["objBody"] = jsonObj;
        // assertEquals(jsonObj.message, expectedErrorMessage);
      } else {
        // fail("Cannot read body");
      }
    }

    const openApi = request.openapi;
    if (
      openApi !== undefined && openApi.schema !== undefined &&
      openApi.schema.parameters !== undefined
    ) {
      openApi.schema.parameters.forEach((param: ParameterObject) => {
        if (param.in === "path" || param.in === "url") {
          requestParams[param.name] = openApi.pathParams[param.name];
        } else if (param.in === "header") {
          requestParams[param.name] = request.headers.get(param.name);
        }
      });
    }
    return requestParams;
  }
}

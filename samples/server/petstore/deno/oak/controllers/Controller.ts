import {
  isJsonBody,
  OpenApiRequest,
  ParameterObject,
} from "./OpenApiRequestModel.ts";

export class Controller {
  static sendResponse(body: any): Response {
    let bodyResponse = "{}";
    if (body instanceof Object) {
      bodyResponse = JSON.stringify(body);
    } else if (typeof (body) === "string") {
      bodyResponse = JSON.stringify(body as string);
    }
    return new Response(bodyResponse, {
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
    } else if (error instanceof Deno.errors.NotSupported) {
      status = 405;
    } else if (error instanceof Deno.errors.PermissionDenied) {
      status = 403;
    }
    console.error(error);
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

  static collectRequestParams(
    request: OpenApiRequest,
  ): { [index: string]: any } {
    const requestParams: { [index: string]: any } = {};
    const requestBody = request.body;
    if (requestBody) {
      if (isJsonBody(request)) {
        requestParams["objBody"] = JSON.parse(requestBody);
      } else {
        requestParams["objBody"] = requestBody;
        console.log("CAREFUL!!!!!!!!!");
      }
    } else {
      // TODO?
    }

    const openApi = request.openapi;
    if (
      openApi !== undefined && openApi.schema !== undefined &&
      openApi.schema.parameters !== undefined
    ) {
      openApi.schema.parameters.forEach((param: ParameterObject) => {
        if (requestParams[param.name] && param.origin === "query") {
          if (!(requestParams[param.name] instanceof Array)) {
            const previousValue = requestParams[param.name];
            requestParams[param.name] = new Array<string>();
            requestParams[param.name].push(previousValue);
          }
          requestParams[param.name].push(param.value);
        } else {
          requestParams[param.name] = param.value;
        }
      });
    }
    return requestParams;
  }
}

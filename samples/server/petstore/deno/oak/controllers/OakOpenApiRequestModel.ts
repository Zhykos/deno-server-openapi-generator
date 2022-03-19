import {
  OpenApiRequest,
  OpenApiRequestMetadata,
  OperationObject,
  ParameterObject,
} from "./OpenApiRequestModel.ts";
import { OakRequest, RouterContext } from "../deps-oak.ts";
import { camelCaseSync } from "../deps.ts";
import { Helpers } from "./Helpers.ts";

export class OakOpenApiRequest implements OpenApiRequest {
  openapi?: OpenApiRequestMetadata | undefined;
  body?: string | undefined;
  headers: Headers;

  private constructor(
    context: RouterContext<string, any, Record<string, any>>,
  ) {
    const schema: OperationObject = {
      parameters: this.createParameters(context),
    };
    this.openapi = {
      schema: schema,
    };

    this.headers = context.request.headers;
  }

  private async readBody(request: OakRequest): Promise<void> {
    if (!request.hasBody) {
      return;
    }

    const headerContentType: string | null = request.headers.get(
      "Content-Type",
    );
    if (Helpers.isJsonBody(request.headers)) {
      const responseValue = await request.body({ type: "json" }).value;
      this.body = JSON.stringify(responseValue);
    } else if (Helpers.isFormDataBody(request.headers)) {
      const responseValue = request.body({ type: "form-data" }).value;
      const formData = await responseValue.read();
      const formRecords: Record<string, string> = formData.fields;
      const bodyObj: { [index: string]: any } = {};
      for (const keyForm in formRecords) {
        bodyObj[keyForm] = formRecords[keyForm];
      }
      formData.files?.forEach((fileData) => bodyObj[fileData.name] = fileData);
      this.body = JSON.stringify(bodyObj);
    } else if (headerContentType) {
      throw new Error(
        `Cannot read body with header content-type: '${headerContentType}'`,
      );
    }
  }

  private createParameters(
    context: RouterContext<string, any, Record<string, any>>,
  ): Array<ParameterObject> {
    const allParameters = new Array<ParameterObject>();
    this.createParametersFromRoute(context.params, allParameters);
    this.createParametersFromURL(
      context.request.url.searchParams,
      allParameters,
    );
    this.createParametersFromHeaders(context.request.headers, allParameters);
    return allParameters;
  }

  private createParametersFromHeaders(
    headers: Headers,
    allParameters: ParameterObject[],
  ): void {
    headers.forEach((value, key) => {
      const param: ParameterObject = {
        name: camelCaseSync(key),
        value: value,
        origin: "headers",
      };
      allParameters.push(param);
    });
  }

  private createParametersFromRoute(
    routeParams: any,
    allParameters: Array<ParameterObject>,
  ): void {
    for (const [key, value] of Object.entries(routeParams)) {
      const param: ParameterObject = {
        name: `${key}`,
        value: value as string,
        origin: "path",
      };
      allParameters.push(param);
    }
  }

  private createParametersFromURL(
    urlParams: URLSearchParams,
    allParameters: Array<ParameterObject>,
  ): void {
    urlParams.forEach((value, key) => {
      const param: ParameterObject = {
        name: `${key}`,
        value: value,
        origin: "query",
      };
      allParameters.push(param);
    });
  }

  static async build(
    context: RouterContext<string, any, Record<string, any>>,
  ): Promise<OakOpenApiRequest> {
    const request = new OakOpenApiRequest(context);
    await request.readBody(context.request);
    return request;
  }
}

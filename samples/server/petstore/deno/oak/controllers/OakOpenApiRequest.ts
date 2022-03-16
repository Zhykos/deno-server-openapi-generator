import {
  OpenApiRequest,
  OpenApiRequestMetadata,
  OperationObject,
  ParameterObject,
} from "./OpenApiRequestModel.ts";
import {
  OakRequest,
  readAll,
  readerFromStreamReader,
  RouterContext,
} from "../deps-oak.ts";
import { camelCaseSync } from "../deps.ts";

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

    const headerAccept: string | null = request.headers.get("accept");

    const responseReader = request.body({ type: "stream" }).value.getReader();
    if (responseReader) {
      const reader: Deno.Reader = readerFromStreamReader(responseReader);
      const bodyRaw: Uint8Array = await readAll(reader);

      if (bodyRaw.length > 0) {
        if (headerAccept === "application/json") {
          this.body = new TextDecoder().decode(bodyRaw);
        } else {
          // TODO?
          console.error("TODO: readBody with header accept: " + headerAccept);
        }
      }
    } else {
      // TODO?
      console.error("TODO: empty body");
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

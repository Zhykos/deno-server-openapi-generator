import {
  OpenApiRequest,
  OpenApiRequestMetadata,
  OperationObject,
  ParameterObject,
} from "./OpenApiRequestModel.ts";
import { RouterContext } from "../deps-oak.ts";

export class OakOpenApiRequest implements OpenApiRequest {
  openapi?: OpenApiRequestMetadata | undefined;
  hasBody: boolean;
  body?: string | undefined;
  headers: Headers;

  constructor(context: RouterContext<string, any, Record<string, any>>) {
    const schema: OperationObject = {
      parameters: this.createParameters(
        context.params,
        context.request.url.searchParams,
      ),
    };
    this.openapi = {
      pathParams: this.createPathParameters(
        context.params,
        context.request.url.searchParams,
      ),
      schema: schema,
    };

    this.headers = new Headers();
    this.hasBody = context.request.hasBody;
    if (this.hasBody) {
      // this.body = context.request.body({type:'stream'}).value;
      this.body = "";
    } else {
      // this.body = null;
    }
  }

  private createParameters(
    routeParams: any,
    urlParams: URLSearchParams,
  ): Array<ParameterObject> {
    const allParameters = new Array<ParameterObject>();
    this.createParametersFromRoute(routeParams, allParameters);
    this.createParametersFromURL(urlParams, allParameters);
    return allParameters;
  }

  private createParametersFromRoute(
    routeParams: any,
    allParameters: Array<ParameterObject>,
  ): void {
    for (const [key] of Object.entries(routeParams)) {
      const param: ParameterObject = { name: `${key}`, in: "path" };
      allParameters.push(param);
    }
  }

  private createParametersFromURL(
    urlParams: URLSearchParams,
    allParameters: Array<ParameterObject>,
  ): void {
    for (const key of urlParams.keys()) {
      const param: ParameterObject = { name: `${key}`, in: "url" };
      allParameters.push(param);
    }
  }

  private createPathParameters(
    routeParams: any,
    urlParams: URLSearchParams,
  ): { [index: string]: string } {
    const allParameters: { [index: string]: string } = {};
    this.createPathParametersFromRoute(routeParams, allParameters);
    this.createPathParametersFromURL(urlParams, allParameters);
    return allParameters;
  }

  private createPathParametersFromRoute(
    routeParams: any,
    allParameters: { [index: string]: string },
  ): void {
    for (const [key, value] of Object.entries(routeParams)) {
      allParameters[key as string] = value as string;
    }
  }

  private createPathParametersFromURL(
    urlParams: URLSearchParams,
    allParameters: { [index: string]: string },
  ): void {
    urlParams.forEach((value, key) => {
      allParameters[key] = value;
    });
  }
}

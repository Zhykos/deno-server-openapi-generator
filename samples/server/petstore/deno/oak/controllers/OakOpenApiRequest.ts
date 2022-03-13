import {
  OpenApiRequest,
  OpenApiRequestMetadata,
  OperationObject,
  ParameterObject,
  RequestBodyObject
} from "./OpenApiRequestModel.ts";
import { RouterContext, OakRequest } from "../deps-oak.ts";

export class OakOpenApiRequest implements OpenApiRequest {
  openapi?: OpenApiRequestMetadata | undefined;
  cache: RequestCache;
  credentials: RequestCredentials;
  destination: RequestDestination;
  headers: Headers;
  integrity: string;
  isHistoryNavigation: boolean;
  isReloadNavigation: boolean;
  keepalive: boolean;
  method: string;
  mode: RequestMode;
  redirect: RequestRedirect;
  referrer: string;
  referrerPolicy: ReferrerPolicy;
  signal: AbortSignal;
  url: string;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;

  constructor(context: RouterContext<string, any, Record<string, any>>) {
    const schema: OperationObject = {
      parameters: this.createParameters(
        context.params,
        context.request.url.searchParams,
      ),
      // requestBody: this.createRequestBody(context.request)
    };
    this.openapi = {
      pathParams: this.createPathParameters(
        context.params,
        context.request.url.searchParams,
      ),
      schema: schema,
    };

    this.cache = "default";
    this.credentials = "same-origin";
    this.destination = "object";
    this.headers = new OakHeaders();
    this.integrity = "";
    this.isHistoryNavigation = false;
    this.isReloadNavigation = false;
    this.keepalive = true;
    this.method = "";
    this.mode = "cors";
    this.redirect = "manual";
    this.referrer = "";
    this.referrerPolicy = "no-referrer";
    this.signal = new AbortController().signal;
    this.url = context.request.url.toString();
    this.bodyUsed = context.request.hasBody;
    if (this.bodyUsed) {
      this.body = context.request.body({type:'stream'}).value;
    } else {
      this.body = null;
    }
  }

  // private createRequestBody(request: OakRequest): RequestBodyObject {
  //   return { content: { "[media: string]": { } } }; // TODO Remove ???
  // }

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

  clone(): Request {
    throw new Error("Method not implemented: clone.");
  }

  arrayBuffer(): Promise<ArrayBuffer> {
    throw new Error("Method not implemented: arrayBuffer.");
  }

  blob(): Promise<Blob> {
    throw new Error("Method not implemented: blob.");
  }

  formData(): Promise<FormData> {
    throw new Error("Method not implemented: formData.");
  }

  json(): Promise<any> {
    throw new Error("Method not implemented: json.");
  }

  text(): Promise<string> {
    throw new Error("Method not implemented: text.");
  }
}

class OakHeaders extends Headers {}

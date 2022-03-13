import {
  OpenApiRequest,
  OpenApiRequestMetadata,
  OperationObject,
  ParameterObject,
} from "./OpenApiRequestModel.ts";
import { RouterContext } from "../deps-oak.ts";

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
      parameters: this.createParameters(context.params),
    };
    this.openapi = {
      pathParams: this.createPathParameters(context.params),
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
    this.url = "";
    this.body = null;
    this.bodyUsed = true;
  }

  private createParameters(params: any): Array<ParameterObject> {
    const parameters = new Array<ParameterObject>();
    for (const [key] of Object.entries(params)) {
      const param: ParameterObject = { name: `${key}`, in: "path" };
      parameters.push(param);
    }
    return parameters;
  }

  private createPathParameters(params: any): { [index: string]: string } {
    const parameters: { [index: string]: string } = {};
    for (const [key, value] of Object.entries(params)) {
      parameters[key as string] = value as string;
    }
    return parameters;
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

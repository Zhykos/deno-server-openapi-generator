export interface OperationObject {
  parameters?: Array<ParameterObject>;
}

export interface ParameterObject {
  name: string;
  in: string;
}

export interface OpenApiRequestMetadata {
  pathParams: { [index: string]: string };
  schema: OperationObject;
}

export interface OpenApiRequest {
  openapi?: OpenApiRequestMetadata;
  body?: string;
  headers: Headers;
}

export function isJsonBody(openApi: OpenApiRequest): boolean {
  const headerAccept: string | null = openApi.headers.get("accept");
  return openApi.body !== null && headerAccept === "application/json";
}
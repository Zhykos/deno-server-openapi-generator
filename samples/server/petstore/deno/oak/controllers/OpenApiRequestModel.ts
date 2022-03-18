export interface OperationObject {
  parameters?: Array<ParameterObject>;
}

export interface ParameterObject {
  name: string;
  value: string;
  origin: string;
}

export interface OpenApiRequestMetadata {
  schema: OperationObject;
}

export interface OpenApiRequest {
  openapi?: OpenApiRequestMetadata;
  body?: string;
  headers: Headers;
}

export function isJsonBody(openApi: OpenApiRequest): boolean {
  const contentType: string | null = openApi.headers.get("Content-Type");
  return openApi.body !== null && contentType === "application/json";
}

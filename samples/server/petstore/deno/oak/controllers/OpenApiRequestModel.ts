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
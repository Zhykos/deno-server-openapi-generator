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
  // headers: Headers;
}

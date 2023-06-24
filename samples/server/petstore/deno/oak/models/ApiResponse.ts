/*
 * OpenAPI model for ApiResponse.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Describes the result of uploading an image resource
 */
export class ApiResponse {
  "code"?: number;
  "type"?: string;
  "message"?: string;

  copyFrom(anotherApiResponse: any): ApiResponse {
    this.code = anotherApiResponse.code;
    this.type = anotherApiResponse.type;
    this.message = anotherApiResponse.message;
    return this;
  }
}

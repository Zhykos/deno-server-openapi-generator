/**
 * OpenAPI Petstore
 * This is a sample server Petstore server. For this sample, you can use the api key `special-key` to test the authorization filters.
 *
 * The version of the OpenAPI document: 1.0.0
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

  copyFrom(anotherApiResponse: any) {
    this.code = anotherApiResponse.code;
    this.type = anotherApiResponse.type;
    this.message = anotherApiResponse.message;
  }
}

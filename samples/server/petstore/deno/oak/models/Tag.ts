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
 * A tag for a pet
 */
export class Tag {
  "id"?: number;
  "name"?: string;

  copyFrom(anotherTag: any) {
    this.id = anotherTag.id;
    this.name = anotherTag.name;
  }
}

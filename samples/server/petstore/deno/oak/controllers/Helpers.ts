/*
 * OpenAPI helpers.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
export class Helpers {
  /**
   * Check body content type base on request headers
   * @param headers Request headers
   * @returns True if content type is Json
   */
  static isJsonBody(headers: Headers): boolean {
    return this.getHeaderContentType(headers) === "application/json";
  }

  /**
   * Check body content type base on request headers
   * @param headers Request headers
   * @returns True if content type is form-data
   */
  static isFormDataBody(headers: Headers): boolean {
    return this.getHeaderContentType(headers).startsWith("multipart/form-data");
  }

  /**
   * Get request content type contained in the request headers
   * @param headers Request headers
   * @returns The request content type or an empty string if not found
   */
  private static getHeaderContentType(headers: Headers): string {
    return headers.get("Content-Type") || "";
  }

  static wrapPromise(obj?: any): Promise<any> {
    return new Promise((resolve) => {
      resolve(obj);
    });
  }
}

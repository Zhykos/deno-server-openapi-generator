/**
 * OpenAPI Petstore
 * This is a sample server Petstore server. For this sample, you can use the api key `special-key` to test the authorization filters.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Category } from './Category.ts';
import { Tag } from './Tag.ts';

/**
* A pet for sale in the pet store
*/
export class Pet {
    'id'?: number;
    'category'?: Category;
    'name': string;
    'photoUrls': Array<string>;
    'tags'?: Array<Tag>;
    /**
    * pet status in the store
    */
    'status'?: StatusEnum;
}

    export enum StatusEnum {
        Available = 'available',
        Pending = 'pending',
        Sold = 'sold'
    }


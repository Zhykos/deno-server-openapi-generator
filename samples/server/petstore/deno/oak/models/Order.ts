/*
* OpenAPI model for Order.
*
* NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
* https://openapi-generator.tech
* Do not edit the class manually.
*/

/**
 * An order for a pets from the pet store
 */
export class Order {
  "id"?: number;
  "petId"?: number;
  "quantity"?: number;
  "shipDate"?: string;
  /**
   * Order Status
   */
  "status"?: StatusEnum;
  "complete"?: boolean = false;

  copyFrom(anotherOrder: any): Order {
    this.id = anotherOrder.id;
    this.petId = anotherOrder.petId;
    this.quantity = anotherOrder.quantity;
    this.shipDate = anotherOrder.shipDate;
    this.status = anotherOrder.status;
    this.complete = anotherOrder.complete;
    return this;
  }
}

export enum StatusEnum {
  Placed = "placed",
  Approved = "approved",
  Delivered = "delivered",
}

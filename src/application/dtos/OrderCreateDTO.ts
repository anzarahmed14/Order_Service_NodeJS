import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, ValidateNested } from "class-validator";
import { OrderProductCreateDTO } from "./OrderProductCreateDTO";

export class OrderCreateDTO {
  @IsNotEmpty()
  // @IsDate()
  orderDate!: Date;

  @IsNotEmpty()
  orderNo!: string;

  @IsNotEmpty()
  userId!: string;

  // ✅ Fix: an order has many order products
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductCreateDTO)
  orderProducts!: OrderProductCreateDTO[];

  // ✅ Optional timestamps (set by DB)
  createdAt?: Date;
  updatedAt?: Date;
}

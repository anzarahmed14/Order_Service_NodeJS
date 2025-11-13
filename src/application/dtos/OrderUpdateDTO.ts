import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { OrderProductEntity } from "../../infrastructure/db/entities/OrderProductEntity";
import { OrderProductUpdateDTO } from "./OrderProductUpdateDTO";
import { IsArray, IsDate,  ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class OrderUpdateDTO{
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
     @Type(() => OrderProductUpdateDTO)
     orderProducts!: OrderProductUpdateDTO[];
   
     // ✅ Optional timestamps (set by DB)
     createdAt?: Date;
     updatedAt?: Date;
    

}
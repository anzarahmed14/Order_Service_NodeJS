import { IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class OrderProductCreateDTO {
  // ⚠️ orderId should NOT be required here, since the order isn’t created yet.
  // TypeORM will handle the relation automatically.
  // You can include it if updating existing records, but for create, omit it.
  
  productId!: string;

  @IsNotEmpty()
  @IsNumber()
  rate!: number;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsNotEmpty()
  @IsNumber()
  total!: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
}

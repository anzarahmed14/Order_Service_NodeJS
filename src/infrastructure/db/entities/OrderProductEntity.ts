import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { OrderEntity } from "./OrderEntity";

@Entity("order_products")
export class OrderProductEntity {
  @PrimaryGeneratedColumn("uuid")
  orderProductId!: string;

  @Column()
  productId: string = "";

  @Column("decimal", { precision: 10, scale: 2 })
  rate!: number;

  @Column("int")
  quantity!: number;

  @Column("decimal", { precision: 12, scale: 2 })
  total!: number;

  @Column({ default: true })
  isActive: boolean = true;

  // ✅ Add this column so orderId exists as a tracked field
  @Column()
  orderId!: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts, {
    onDelete: "CASCADE",
    eager: false,
    
  })
  @JoinColumn({ name: "orderId" })
  order!: OrderEntity;
}

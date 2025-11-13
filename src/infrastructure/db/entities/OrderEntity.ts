import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderProductEntity } from "./OrderProductEntity";

@Entity("orders")
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid")
  orderId!: string;

@Column()
orderDate!: Date;

  @Column({ unique: true })
  orderNo: string = "";

  @Column()
  userId: string = "";

  // One order has many orderProducts
  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, {
    cascade: true, // persists/removes children when order is saved/removed
    eager: true,   // optional: load products automatically with order (remove if you want lazy loading)
  })
  orderProducts!: OrderProductEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

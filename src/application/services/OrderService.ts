import { Order } from "../../domain/entities/Order";
import { OrderProduct } from "../../domain/entities/OrderProduct";
import { OrderProductEntity } from "../../infrastructure/db/entities/OrderProductEntity";

import { OrderProductRepository } from "../../infrastructure/repositories/OrderProductRepository";
import { OrderRepository } from "../../infrastructure/repositories/OrderRepository";
import { OrderCreateDTO } from "../dtos/OrderCreateDTO";
import { OrderProductCreateDTO } from "../dtos/OrderProductCreateDTO";
import { OrderUpdateDTO } from "../dtos/OrderUpdateDTO";
import { v4 as uuidv4 } from 'uuid';


export class OrderService {
  private repo = new OrderRepository();
  private orderProductRepo = new OrderProductRepository();

  async getOrderById(id: string) {
    return this.repo.findById(id);

  }

  async createOrder(dto: OrderCreateDTO) {
    // const orderProductEntity = await this.orderProductRepo.findById(dto.o);
    // if (!orderProductEntity) throw new Error(`order not found ${dto.orderProducts.orderProductId}`)

    const order: Order = {
      orderId: uuidv4(),
      orderNo: dto.orderNo,
      orderDate: dto.orderDate,
      userId: dto.userId,
      orderProducts: dto.orderProducts.map(el => new OrderProduct("", "", el.productId, el.rate, el.quantity, el.total, el.isActive)),

      //createdAt: new Date(),
      //updatedAt: new Date(),

    }



    return this.repo.create(order);

  }


  async updateOrder(id: string, dto: OrderUpdateDTO): Promise<Order | null> {
    // verify exists and keep createdAt (and existing relations if needed)
    const existing = await this.repo.findById(id);
    if (!existing) return null;

    // Build the domain Order object (similar style to createOrder)
    const order: Order = {
      orderId: id,
      orderDate: dto.orderDate,
      orderNo: dto.orderNo,
      userId: dto.userId,
      orderProducts: dto.orderProducts.map(
        (p) =>
          new OrderProduct(
            p.orderProductId && p.orderProductId.trim() !== "" ? p.orderProductId : undefined, // new product if undefined
            id, // ✅ assign orderId automatically
            p.productId,
            p.rate,
            p.quantity,
            p.total,
            p.isActive
          )
      )
    };


    const removeProduct  = existing.orderProducts.filter(dbpr=> ! dto.orderProducts.some(up=>up.orderProductId===dbpr.orderProductId));


     const removeProductFromOrder: Order = {
      orderId: id,
      orderDate: dto.orderDate,
      orderNo: dto.orderNo,
      userId: dto.userId,
      orderProducts: removeProduct.map(
        (p) =>
          new OrderProduct(
            p.orderProductId && p.orderProductId.trim() !== "" ? p.orderProductId : undefined, // new product if undefined
            id, // ✅ assign orderId automatically
            p.productId,
            p.rate,
            p.quantity,
            p.total,
            p.isActive
          )
      )
    };

    await this.repo.deletebyObject(removeProductFromOrder);


    return this.repo.update("dasd", order);
  }





  async deleteOrder(id: string) {
    return this.repo.delete(id);
  }

  async getOrders() {
    return this.repo.findAll();
  }

  // async getUserByName(userName:string):Promise<User|null>{
  //     return await this.repo.findByName(userName);
  // }
}
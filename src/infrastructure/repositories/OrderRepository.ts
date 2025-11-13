
import { Order } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";

import { AppDataSource } from "../db";
import { OrderEntity } from "../db/entities/OrderEntity";
import { OrderProductEntity } from "../db/entities/OrderProductEntity";
import { OrderMapper } from "../mappers/OrderMapper";


export class OrderRepository implements IOrderRepository {



  private repo = AppDataSource.getRepository(OrderEntity);
  private orderProductRepo = AppDataSource.getRepository(OrderProductEntity);

  async findById(id: string): Promise<Order | null> {
    const entity = await this.repo.findOne({
      where: { orderId: id },
      relations: ["orderProducts"], // include related products
    });

    if (!entity) {
      throw new Error(`Order with id ${id} not found`);
    }

    return OrderMapper.toDomain(entity);
  }




  async findById2(id: string): Promise<Order | null> {
    const entity = await this.repo.findOneBy({ orderId: id });
    if (!entity) {
      throw new Error(`Order with id ${id} not found`);
    }
    return OrderMapper.toDomain(entity);
  }

  async create(order: Order): Promise<Order> {



    console.log("order", order)

    const newOrder = OrderMapper.toEntity(order)

    const saved = await this.repo.save(newOrder);
    return OrderMapper.toDomain(saved);

  }

  //      async update(id: string, data: Partial<Order>): Promise<Order> {
  //     //    await this.repo.update(id,data);
  //     //    const updated = await this.repo.findOne({where: { orderId: id },
  //     //   relations: ["orderProducts"],});
  //     //    if (!updated) throw new Error("Order not found");
  //     //    return OrderMapper.toDomain(updated);
  //      const existingOrder = await this.repo.findOne({
  //     where: { orderId: id },
  //     relations: ["orderProducts"],
  //   });

  //   if (!existingOrder) throw new Error("Order not found");

  //   // Update main fields


  //   // Delete old products and replace




  //   // ✅ Use save instead of update
  //   return await this.repo.save(existingOrder);
  //     }

  // async update(id: string,data: Partial<Order>): Promise<Order> {

  //     await this.repo.update(id, data); // performs the update but doesn't return the updated entity

  //             const updatedEntity = await this.repo.findOne({ where: { orderId: id } });
  //             if (!updatedEntity) {
  //                 throw new Error(`Order with ID ${id} not found`);
  //             }

  //             return OrderMapper.toDomain(updatedEntity);
  // }



  async update(id: string, order: Order): Promise<Order> {
    // convert to entity, save, and return domain model (same pattern as create)
    const orderEntity = OrderMapper.toEntity(order);
    const saved = await this.repo.save(orderEntity);
    return OrderMapper.toDomain(saved);
  }


  async delete(id: string): Promise<void> {
    await this.repo.delete({ orderId: id });
  }

  async deletebyObject( order: Order): Promise<void> {
      const orderEntity = OrderMapper.toEntity(order);
    await this.repo.remove(orderEntity);
  }

  async findAll(): Promise<Order[]> {
    const allOrder = await this.repo.find();
    const userDto = allOrder.map((order: any) => OrderMapper.toDomain(order));
    return userDto;
  }

  //    async  findByName(username: string): Promise<Order| null> {
  //         const entity = await this.repo.findOne({where:{name:username}});

  //         if(!entity){
  //             return Promise.resolve(null);
  //         }

  //        return UserMapper.toDomain(entity);
  //     }

}

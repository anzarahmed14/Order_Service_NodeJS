import { OrderProduct } from "../../domain/entities/OrderProduct";
import { IOrderProductRepository } from "../../domain/repositories/IOrderProductRepository";
import { AppDataSource } from "../db";
import { OrderProductEntity } from "../db/entities/OrderProductEntity";


export class OrderProductRepository implements IOrderProductRepository{
    async findAll(): Promise<OrderProduct[]> {
         const entities = await this.repo.find();
         return entities.map(e => new OrderProduct(e.orderProductId,e.order.orderId,e.productId,e.rate,e.quantity,e.total,e.isActive))
    }
    

    private repo = AppDataSource.getRepository(OrderProductEntity);
    
    async findById(id: string): Promise<OrderProduct | null> {
      const entity = await this.repo.findOneBy({orderProductId:id}) ;
      if (!entity) throw new Error("orderProduct not found");

      const product  = new OrderProduct (entity.orderProductId,entity.order.orderId, entity.productId,entity.rate,entity.quantity,entity.total, entity.isActive);


       return product ;
    }
    async update(id: string, data: Partial<OrderProduct>): Promise<OrderProduct> {
        await this.repo.update(id, data);
        const updated = await this.repo.findOneBy({ orderProductId:id });
        if (!updated) throw new Error("User not found");
        return new OrderProduct(updated.orderProductId,updated.order.orderId,updated.productId,updated.rate,updated.quantity,updated.total,updated.isActive);
    }

// async getRoleByName(roleName: string): Promise<role| null> {
//        const entity = await this.repo.findOneBy({roleName})
//        if (!entity) throw new Error("Role not found");
//        return new role(entity.id,entity.roleName,entity.isActive) ;
       
//     }
 
    async delete(id: string): Promise<void> {
       await this.repo.delete({orderProductId:id})
    }

    
   async create(orderProduct:Partial<OrderProduct
    >): Promise<OrderProduct> {
       const entity = new OrderProductEntity();
      
        entity.order.orderId = orderProduct.orderId!;
        entity.isActive = orderProduct.isActive!;
        entity.productId = orderProduct.productId!;
        entity.quantity = orderProduct.quantity!;
        entity.rate = orderProduct.rate!;
        entity.total = orderProduct.total!;

        const updated = await this.repo.save(entity);

        

       return new OrderProduct(updated.orderProductId,updated.order.orderId,updated.productId,updated.rate,updated.quantity,updated.total,updated.isActive);
  
   }
     
   
}
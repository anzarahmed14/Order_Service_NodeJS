import { OrderProductRepository } from "../../infrastructure/repositories/OrderProductRepository";
import { OrderProductCreateDTO } from "../dtos/OrderProductCreateDTO";
import { OrderProductUpdateDTO} from "../dtos/OrderProductUpdateDTO";
import {v4 as  uuidv4} from 'uuid';
export class OrderProductService{
    private repo = new OrderProductRepository();

    async createOrderProduct(dto:OrderProductCreateDTO){
        return this.repo.create(
           {
                orderProductId:uuidv4(),
               orderId: "",
               productId:dto.productId,
               quantity:dto.quantity,
               rate:dto.rate,
               total:dto.total,
               isActive: dto.isActive
               
           }
        );
    }

    async updateOrderProduct(id:string,dto:OrderProductUpdateDTO){
        return this.repo.update(id,{
            orderId:dto.orderId,
            productId:dto.productId,
            quantity:dto.quantity,
            rate:dto.rate,
            total:dto.total,
               isActive: dto.isActive
        })
    }

    // getRoleByName(name:string){
    //     return this.repo.getRoleByName(name);

    // }

    getOrderProductById(id:string){
        return this.repo.findById(id);
    }

    deleteOrderProductById(id:string){
        return this.repo.delete(id);
    }

    getAllOrderProducts(){
        return this.repo.findAll();
    }
}
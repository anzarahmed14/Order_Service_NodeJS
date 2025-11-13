import { OrderProduct } from "../entities/OrderProduct";

export interface IOrderProductRepository{
    findById(id:string): Promise<OrderProduct | null>;
    create(orderProduct:Partial<OrderProduct>): Promise<OrderProduct>;
    update(id: string,data:Partial<OrderProduct>): Promise<OrderProduct>;
    delete(id:string):Promise<void>;
    // getByName(roleName:string): Promise<OrderProduct | null>;
    findAll():Promise<OrderProduct[]>;
}
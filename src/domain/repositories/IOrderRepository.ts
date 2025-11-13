import { Order } from "../entities/Order";


export interface IOrderRepository {
    findById(id:string):Promise<Order | null>;
    findAll():Promise<Order[]>;
     create(user: Order):Promise<Order>;
     update(id:string, data: Partial<Order>):Promise<Order>;
     delete(id:string):Promise<void>;
    //  findByName(userName:string):Promise<Order | null>;
     deletebyObject(order: Order): Promise<void> ;

   
}
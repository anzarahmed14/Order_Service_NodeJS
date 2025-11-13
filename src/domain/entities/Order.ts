import { OrderProductEntity } from "../../infrastructure/db/entities/OrderProductEntity";
import { OrderProduct } from "./OrderProduct";

export class Order {
    constructor(public orderId:string | undefined ,
        public orderDate:Date,
        public orderNo:string,
        public userId:string,
        public orderProducts : OrderProduct[],
        //public createdAt:Date,
        //public updatedAt:Date
    ){

    }
}
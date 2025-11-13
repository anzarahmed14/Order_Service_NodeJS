export class OrderProduct{
    constructor(public orderProductId:string | undefined ,
        public orderId:string,
        public productId:string,
        public rate:number,
        public quantity:number,
        public total:number,
        public isActive:boolean
    ){

    }
}
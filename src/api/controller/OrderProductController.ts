import { validate } from "class-validator";
import { OrderProductCreateDTO } from "../../application/dtos/OrderProductCreateDTO";
import { OrderProductService } from "../../application/services/OrderProductService";
import { Request, Response } from "express";
import { OrderProductUpdateDTO} from "../../application/dtos/OrderProductUpdateDTO";


export class OrderProductController{
    private orderProductService = new OrderProductService();

    createOrderProduct = async(req:Request,res:Response) =>{
        
        const dto = Object.assign(new OrderProductCreateDTO(),req.body);
         console.log(`DTO  ${JSON.stringify(dto)}`);
        const error = await validate(dto); 
         if (error.length > 0) return res.status(400).json({ error });
        const role= await this.orderProductService.createOrderProduct(dto);
         res.status(201).json(role);
    }

    updateOrderProduct = async(req:Request,res:Response)=>{
       
            const dto = Object.assign(new OrderProductUpdateDTO(),req.body);
            const id = req.params.id;
            await validate(dto); 
        const error = await validate(dto); 
             if (error.length > 0) return res.status(400).json({ error });
             const orderProduct = await this.orderProductService.updateOrderProduct(id,dto);
            res.json(orderProduct);
        

    }

    // getRoleByName = async(req:Request,res:Response)=>{
    //     const name = req.params.roleName;
    //     const  roleName = await this.roleService.getRoleByName(name);
    //      if(!roleName) return res.status(404).json({error: "User not found"});
    //     res.json(roleName);
    // }

    getOrderProductById = async(req:Request,res:Response)=>{
        try{const id = req.params.id;
        const orderProduct = await this.orderProductService.getOrderProductById(id);
        res.json(orderProduct);
        }catch(error){
            return res.status(404).json({error: "orderProduct not found"});
        }
    }

    deleteOrderProductById = async(req:Request,res:Response) =>{
        try{
            const id = req.params.id;
            await this.orderProductService.deleteOrderProductById(id);
             res.send();
        }catch(error){
             return res.status(404).json({error: "orderProduct not found"});
        }
    }

    getAllOrderProducts = async(req:Request,res:Response)=>{
        try{
            const orderProduct = await this.orderProductService.getAllOrderProducts();
            res.json(orderProduct);
        }catch(error){
             return res.status(404).json({error: "orderProduct not found"});
        }
    }
}
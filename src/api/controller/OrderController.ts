import { OrderCreateDTO} from "../../application/dtos/OrderCreateDTO";
import { OrderService } from "../../application/services/OrderService";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { OrderUpdateDTO} from "../../application/dtos/OrderUpdateDTO";

export class OrderController {
    private service = new OrderService();


    createOrder = async (req: Request, res: Response) => {
       // const dto = Object.assign(new OrderCreateDTO(), req.body);
        
       const dto = plainToInstance(OrderCreateDTO, req.body);

        console.log("test")
        console.log(dto);
        try {
            // Validate DTO
            const errors = await validate(dto);
            if (errors.length > 0) {
                const formattedErrors = errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));

                return res.status(400).json({
                    message: "Validation failed",
                    errors: formattedErrors
                });
            }

            // Call service
            const order = await this.service.createOrder(dto);
            return res.status(201).json(order);

        } catch (error: any) {
            console.error("Error creating order:", error);

            return res.status(500).json({
                message: "Internal server error",
                error: error.message || error.toString()
            });
        }
    };
    getOrder = async (req: Request, res: Response) => {
        const order = await this.service.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    }

    updateOrder = async (req: Request, res: Response) => {
        const dto = plainToInstance(OrderUpdateDTO, req.body);
        const id = req.params.id;
        const errors = await validate(dto);
        if (errors.length > 0) return res.status(400).json({ errors })
        const order = await this.service.updateOrder(id, dto);
        res.json(order);
    }

    deleteOrder = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.service.deleteOrder(id);
            res.send();
        } catch (error) {
            return res.status(404).json({ error: "Order not found" });
        }
    }
    getAllOrder = async (req: Request, res: Response) => {
        try {
            const allOrder = await this.service.getOrders();
            res.json(allOrder)
        } catch (error) {
            return res.status(404).json({ error: "Order not found" });
        }
    }
    // getUserByName = async (req: Request, res: Response) => {
    //     const user = await this.service.getUserByName(req.params.userName);
    //     if (!user) return res.status(404).json({ error: "User not found" });
    //     res.json(user);
    // }
}
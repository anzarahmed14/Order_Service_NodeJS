import { Router } from "express";
import { OrderController } from "../controller/OrderController";



const router = Router();
const controller = new OrderController();

router.post("/", controller.createOrder);
router.get("/", controller.getAllOrder);
router.get("/:id", controller.getOrder);
router.put("/:id", controller.updateOrder);
router.delete("/:id",controller.deleteOrder);
// router.post("/:getuserbyname",controller.getUserByName);


export default router;
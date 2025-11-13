import { Router } from "express";

import { OrderProductController } from "../controller/OrderProductController";

const router = Router();

const orderProductController = new OrderProductController();
router.post("/",orderProductController.createOrderProduct);
router.put("/:id",orderProductController.updateOrderProduct);
router.get("/",orderProductController.getAllOrderProducts);
router.get("/:id",orderProductController.getOrderProductById);
// router.get("/:roleName",orderProductController.getRoleByName);
router.delete("/:id",orderProductController.deleteOrderProductById);
export default router;
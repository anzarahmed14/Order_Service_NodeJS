import "reflect-metadata";
import express from 'express';

import orderRoutes from './api/routes/order.routes';
import orderProductRoutes from './api/routes/orderProduct.routes';


const app = express();
app.use(express.json());
app.use("/api/orders",orderRoutes);
app.use("/api/orderProducts",orderProductRoutes);
app.get("/", (request, respose)=>respose.send({status: "Ok"}));

export default app;

import express from 'express';
import { createOrder } from '../controllers/orders/createOrder.js';
import { getOrdersByCustomer } from '../controllers/orders/getOrdersByCustomer.js';
import { getOrdersByRider } from '../controllers/orders/getOrdersByRider.js';
import { getOrders } from '../controllers/orders/getOrders.js';
import { updateOrder } from '../controllers/orders/updateOrder.js';
import { deleteOrder } from '../controllers/orders/deleteOrder.js';
import { assignRider } from '../controllers/orders/assignRider.js';

const router = express.Router();

router.get('/orders', getOrders);
router.get("/orders/:customer_id", getOrdersByCustomer);
router.get("/orders/rider/:rider_id", getOrdersByRider)
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.put("/orders/:orderId/assign-rider", assignRider);

export default router;

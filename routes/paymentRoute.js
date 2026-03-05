import express from "express";
import { createTransaction, handleNotification, checkStatus } from "../midtrans.js";
import router from './userRoute';

const router = express.Router();

router.post('/create', createTransaction);
router.post('/notification', handleNotification);
router.get('/status/:orderId', checkStatus);

export default router;
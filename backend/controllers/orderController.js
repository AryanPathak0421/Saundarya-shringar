const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');

let razorpay;
const getRazorpayInstance = () => {
    if (!razorpay) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay Keys are missing in Environment Variables (.env)');
        }
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return razorpay;
};

// Customer: Capture Razorpay Order (Step 1)
exports.captureRazorpayOrder = async (req, res, next) => {
    try {
        const instance = getRazorpayInstance();
        const { amount } = req.body;
        if (!amount) return res.status(400).json({ status: 'error', message: 'Amount is required' });

        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: 'INR',
            receipt: `rcpt_${Math.floor(Math.random() * 1000000)}`,
        };

        const order = await instance.orders.create(options);
        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) {
        next(err);
    }
};

// Customer: Verify Razorpay Payment & Save Order (Step 2)
exports.verifyRazorpayPayment = async (req, res, next) => {
    try {
        const instance = getRazorpayInstance();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderDetails
        } = req.body;

        // Signature Verification
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ status: 'error', message: 'Payment verification failed (Invalid Signature)' });
        }

        // Create Order in DB
        const newOrder = await Order.create({
            user: req.user._id,
            items: orderDetails.items,
            totalAmount: orderDetails.totalAmount,
            shippingAddress: orderDetails.shippingAddress,
            paymentStatus: 'Completed',
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature
        });

        res.status(201).json({ status: 'success', data: { order: newOrder } });
    } catch (err) {
        next(err);
    }
};

// Customer: Create Order (Legacy/Non-Razorpay flow or for reference)
exports.createOrder = async (req, res, next) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;
        if (!items || items.length === 0) return res.status(400).json({ status: 'error', message: 'Order items are required.' });

        const newOrder = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress
        });

        res.status(201).json({ status: 'success', data: { order: newOrder } });
    } catch (err) {
        next(err);
    }
};

// Customer: Get my orders
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort('-date').lean();
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (err) {
        next(err);
    }
};

// Public/Customer: Track Order
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId }).lean();
        if (!order) return res.status(404).json({ status: 'error', message: 'Order not found.' });
        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) {
        next(err);
    }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('user', 'name phone').sort('-date').lean();
        res.status(200).json({ status: 'success', data: { orders } });
    } catch (err) {
        next(err);
    }
};

// Admin: Update Status
exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status, trackingId, paymentStatus } = req.body;

        let updatePayload = {};
        if (status) updatePayload.status = status;
        if (trackingId) updatePayload.trackingId = trackingId;
        if (paymentStatus) updatePayload.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(req.params.id, updatePayload, { new: true, runValidators: true });
        if (!order) return res.status(404).json({ status: 'error', message: 'Order not found.' });
        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) {
        next(err);
    }
};

// Customer: Request Return/Replacement
exports.requestReturn = async (req, res, next) => {
    try {
        const { returnReason, returnAction, returnImages } = req.body;
        if (!['Refund', 'Replace'].includes(returnAction)) return res.status(400).json({ status: 'error', message: 'Invalid Action' });

        const statusMap = returnAction === 'Replace' ? 'Replacement Requested' : 'Return Requested';
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id, status: 'Delivered' },
            { returnReason, returnAction, returnStatus: statusMap, returnImages: returnImages || [] },
            { new: true, runValidators: true }
        );

        if (!order) return res.status(404).json({ status: 'error', message: 'Eligible Delivered Order not found or Unauthorised.' });
        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) { next(err); }
};

// Admin: Process Return/Replacement Status
exports.processReturnUpdate = async (req, res, next) => {
    try {
        const { returnStatus } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { returnStatus }, { new: true, runValidators: true });
        if (!order) return res.status(404).json({ status: 'error', message: 'Order not found.' });
        res.status(200).json({ status: 'success', data: { order } });
    } catch (err) { next(err); }
};

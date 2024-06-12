const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderTrackingSchema = new Schema({
	order_id: {
		type: Schema.Types.ObjectId,
		ref: 'Order',
		required: true
	},
	status: {
		type: String,
		enum: ['Pending', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'],
		required: true
	},
	location: {
		type: String
	},

}, {
	timestamps: true
});

const OrderTracking = mongoose.model('OrderTracking', orderTrackingSchema);

module.exports = OrderTracking;

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;

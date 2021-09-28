const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  item: { type: String, require: true },
  quantity: { type: Number, require: true },
  price: { type: String, require: true },
  image: { type: String, require: true },
});

module.exports = mongoose.model("Order", OrderSchema);

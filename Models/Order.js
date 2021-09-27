const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema
({
    items: { type: Array, default: [] },
});

module.exports = mongoose.model("Order", OrderSchema);

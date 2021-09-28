const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema
({
    items: { type: Array, default: [] },
}, {timestamps: true});

module.exports = mongoose.model("Order", OrderSchema);

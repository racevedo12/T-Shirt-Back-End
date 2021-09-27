const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema
(
    {
        listOfItems: {type: Array, default: [], }
    }
);

module.exports = mongoose.model("Order", OrderSchema);
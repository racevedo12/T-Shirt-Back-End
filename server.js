// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/" + "item-board";

// Mongoose configuration
mongoose.connection.on("error", (err) =>
    console.log(err.message + " mongo is not running")
);
mongoose.connection.on("disconnected", () =>
    console.log("mongoose is disconnected")
);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("Mongoose Connected");
});

// Cors
app.use(cors());

// Importing Schemas
const Item = require("./Models/Item");
const Order = require("./Models/Order");

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importing Seed data
const seedItems = require("./Models/seeds.js");

// Seeding data into items db
app.use("/seed-items", (req, res, next) => {
    Item.collection.deleteMany({});

    Item.insertMany(seedItems)
      .then((res) => console.log(res))
      .catch(next);

    res.send("Items seeded!!!");
});

// Controllers
const itemsController = require("./Controllers/items");
app.use("/items", itemsController);
const orderController = require("./Controllers/orders");
app.use("/order", orderController);

app.listen(PORT, () => {
    console.log(`✅ PORT: ${PORT} 🌟`);
});

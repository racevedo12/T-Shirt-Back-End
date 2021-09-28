// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'items';

// Mongoose configuration
mongoose.connection.on("error", (err) =>
  console.log(err.message + " mongo is not running")
);
mongoose.connection.on("disconnected", () =>
  console.log("mongoose is disconnected")
);

mongoose.connect("mongodb://localhost:27017/items", {
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
const seedOrderItems = require("./db/order-seeds.json");

// Seeding data into items db
app.use("/seed-items", (req, res, next) => 
{
  Item.collection.deleteMany({});

  Item.insertMany(seedItems)
    .then((res) => console.log(res))
    .catch(next);

});

// Seeding data into order db
app.use("/seed-order", (req, res, next) =>
{
  Order.collection.deleteMany();

  Order.find( {} )
  // Order.findOneAndUpdate( [], {$push: seedOrderItems}, {new: true})
  .then( (res) => console.log(res.values()) )
  .catch(next);

  res.send("Order items seeded!!!");

});


// Controllers
const itemsController = require("./Controllers/items");
app.use("/items", itemsController);
const orderController = require("./Controllers/orders");
app.use("/order", orderController);

app.listen(PORT, () => {
  console.log(`✅ PORT: ${PORT} 🌟`);
});

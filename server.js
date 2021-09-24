// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const Item = require("./Models/Item");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'items';

// Mongoose configuration
mongoose.connection.on("error", (err) => console.log(err.message + " mongo is not running"));
mongoose.connection.on("disconnected", () => console.log("mongoose is disconnected") );

mongoose.connect("mongodb://localhost:27017/items", {useNewUrlParser: true} );

mongoose.connection.once("open", () =>
{
    console.log("Mongoose Connected");
});

// Mockup Data
const seedItems =
[
    {
      name: "Item1",
      description: "First Item",
      price: "3"
    },

    {
        name: "Item2",
        description: "Second Item",
        price: "3.7"
    },

];

// Seeding data into db
app.use("/seed-items", (req, res, next) =>
{
    Item.deleteMany()

    Item.insertMany(seedItems)
        .then( (res) => console.log(res) )
        .catch(next)

    res.send("Items seeded!!!");
});

// Controllers
const itemsController = require("./Controllers/items");
app.use("/items", itemsController);

app.listen(PORT, () =>
{
    console.log(`✅ PORT: ${PORT} 🌟`);
});
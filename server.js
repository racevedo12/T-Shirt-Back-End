// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/" + "items";

// Mongoose configuration
mongoose.connection.on("error", (err) =>
  console.log(err.message + " mongo is not running")
);
mongoose.connection.on("disconnected", () =>
  console.log("mongoose is disconnected")
);

mongoose.connect("mongodb://localhost:27017/items", { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Mongoose Connected");
});

// Cors
app.use(cors());

// Importing Schemas
const Item = require("./Models/Item");
const Order = require("./Models/Order");

// Mockup Data
const seedItems = [
  {
    name: "FillerItem",
    description: "First Item",
    price: "3",
    image: "https://imgur.com/",
  },
  {
    name: "1/10th Ounce American Gold Eagle",
    description:
      "The modern Gold American Eagle series began in 1986. The obverse side is that of Lady Liberty created by Augustus Saint Gaudens, the design used for the 1907-1933 $20.00 US Double Eagle gold coin. Because the random year SKU can contain both type one and type two Gold Eagles, the coin’s reverse could depict one of two designs. The original reverse design features the classic heraldic eagle found on all silver and gold eagles since its inception in 1986. The new design, implemented in mid-2021 features a portrait of a single bald eagle intensely staring ahead, created by artist Jennie Norris.",
    price: "210",
    image: "https://imgur.com/GIz9Bu3",
  },

  {
    name: "Goldseed 10x 1g Gold Bar - Argor-Heraeus (In Assay)",
    description:
      "With a strong Swiss identity, Argor-Heraeus is one of the world’s oldest refiners and assayers of Precious Metals. Their tamper evident packaging backs the weight and purity of this .9999 fine bar and ensures your bar has not been improperly handled.",
    price: "1000",
    image: "https://imgur.com/VhRbPUY",
  },

  {
    name: "1/10th Ounce Gold Canadian Maple",
    description:
      "The Royal Canadian Mint Gold Maple Coin was first released in 1979 by the Royal Canadian Mint. Originally though, the coins were only minted in a purity of .999 gold. It wasn’t until 1982 that the mint switched to using .9999 purity gold in it’s coins. This was also the first year they released the Maple Leaf Coin as a fractional 1/10 oz coin.",
    price: "200",
    image: "https://imgur.com/1ZFMInU",
  },
];

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seeding data into db
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
app.use("/orders", orderController);

app.listen(PORT, () => {
  console.log(`✅ PORT: ${PORT} 🌟`);
});

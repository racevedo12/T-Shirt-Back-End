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
app.use("/seed-items", (req, res, next) => {
  Item.collection.deleteMany({});

  Item.insertMany(seedItems)
    .then((res) => console.log(res))
    .catch(next);

// Cors
app.use( cors() );

  // Order.insertMany(seedOrderItems)
  Order.updateOne( {} , {$set: {items: {seedOrderItems}}}, {upsert: true} )
    .then((res) => console.log(res))
    .catch(next);

  res.send("Order items seeded!!!");
});

// Seeding data into order db
app.use("/seed-order", (req, res, next) =>
{
    Order.collection.deleteMany( {} );

    dummyOrderData.forEach( (item) =>
    {
        Item.create(item)
            .then(response => 
            {
                Order.updateOne( {name: "OrderList"} )
                    .then(response => 
                    {
                        // response.push(item)
                        console.log("Data added", response)
                    })
                    .catch(next)
            })
            .catch(next)
    })

    // console.log(allItemsIds)
    // .then(response => 
    //     {
    //         Item.findById( response._id )
    //             .then( response => 
    //             {
    //                 // console.log(response + "\n")
    //                 allItems.push(response);
    //                 Item.findByIdAndDelete(response._id)
    //                     .then( response => console.log("Data deleted: " + response) )
    //                     .catch(next)
    //             })
    //             .catch(next)
    //     })
    //     .catch(next)

    // console.log(allItems)
    // for(let item of dummyOrderData)
    // {
    //     Item.create(item)
    //         .then(response => 
    //         {
    //             console.log(response)
    //             // Item.findById( {_id: response._id} )
    //             //     .then( response => 
    //             //     {
    //             //         console.log(response)
    //             //         // allItems.push(response);
    //             //         // Item.findByIdAndDelete(response._id)
    //             //         //     .then( response => console.log("Data deleted: " + response) )
    //             //         //     .catch(next)
    //             //     })
    //             //     .catch(next)
    //         })
    //         .catch(next)
        
    //     // console.log(allItems)
    // }

    
    // Order.updateOne( {}, { $push: {$each: allItems} } )
    //     .then(response => console.log(response) )
    //     .catch(next)

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

// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + 'items';
const cors = require("cors");

// Mongoose configuration
mongoose.connection.on("error", (err) => console.log(err.message + " mongo is not running"));
mongoose.connection.on("disconnected", () => console.log("mongoose is disconnected") );

mongoose.connect("mongodb://localhost:27017/items", {useNewUrlParser: true} );

mongoose.connection.once("open", () =>
{
    console.log("Mongoose Connected");
});

// Importing Schemas
const Item = require("./Models/Item");
const Order = require("./Models/Order");

// Mockup Data For items
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

// Mockup Data For order
const dummyOrderData =
[
    {
        name: "Sofa",
        description:
            "Scandinavian Helsinki irure, airport Melbourne cillum dolore duis. Elegant elit smart, Asia-Pacific airport Nordic aute exclusive velit Beams uniforms ex Shinkansen. Ut wardrobe id, anim Winkreative non uniforms occaecat bespoke Helsinki.",
        price: 100,
    },

    {
        name: "Bicycle",
        description:
            "Intricate tempor laboris essential Fast Lane sint sophisticated Swiss bulletin eiusmod anim in. Airport soft power Comme des Garçons signature Winkreative nisi labore wardrobe, velit Marylebone proident dolore.",
        price: 80,
    },

    {
        name: "Office Chair",
        description:
            "Scandinavian Helsinki irure, airport Melbourne cillum dolore duis. Elegant elit smart, Asia-Pacific airport Nordic aute exclusive velit Beams uniforms ex Shinkansen. Ut wardrobe id, anim Winkreative non uniforms occaecat bespoke Helsinki.",
        price: 35,

    },

    {
        name: "6 Sets of Dishes and Cutlery",
        description:
            "K-pop ad handsome sleepy pintxos nulla Porter voluptate delightful consequat quality of life. Elegant tote bag ut exclusive finest Ginza dolor et Scandinavian. Boulevard in excepteur, exquisite Muji dolor boutique laborum Winkreative dolore laboris Fast Lane.",
        price: 20,
    },
];

// Middleware configuration
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) );

// Cors
app.use( cors() );

// Seeding data into items db
app.use("/seed-items", (req, res, next) =>
{
    Item.collection.deleteMany({});
    
    Item.insertMany(seedItems)
        .then( (res) => console.log(res) )
        .catch(next)

    res.send("Items seeded!!!");
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

const ordersController = require("./Controllers/orders");
const { all } = require("./Controllers/items");
app.use("/order", ordersController);

app.listen(PORT, () =>
{
    console.log(`✅ PORT: ${PORT} 🌟`);
});
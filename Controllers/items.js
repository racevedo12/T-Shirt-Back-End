// Dependencies
const express = require("express");
const router = express.Router();

// Models
const Item = require("../Models/Item");

// Index Route
router.get("/", (req, res, next) =>
{
    Item.find({})
        .then(items => res.json(items) )
        .catch(next)
});

// Show Route
router.get("/:id", (req, res, next) =>
{
    Item.findById(req.params.id)
        .then(itemFound => res.status(200).send(itemFound) )
        .catch(next)
});

// Create Route
router.post("/", (req, res, next) =>
{
    Item.create(req.body)
        .then(itemCreated => res.status(201).send(itemCreated) )
        .catch(next)
});

// Update route
router.put("/:id", (req, res, next) =>
{
    Item.findOneAndUpdate( {_id: req.params.id}, req.body, {new: true} )
        .then(updatedItem => res.status(201).send(updatedItem) )
        .catch(next)
});

module.exports = router;
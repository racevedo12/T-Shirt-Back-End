// Dependencies
const express = require("express");
const router = express.Router();

// Models
const Order = require("../Models/Order");

// Index Route
router.get("/", (req, res, next) => {
    Order.find({})
        .populate("items")
        .then((items) => res.json(items))
        .catch(next);
});

// Show Route
router.get("/:id", (req, res, next) => {
    Order.findById(req.params.id)
        .populate("items")
        .then((itemFound) => res.status(200).send(itemFound))
        .catch(next);
});

// Create Route
router.post("/", (req, res, next) => {
    Order.create(req.body)
        .then((itemCreated) => res.status(201).send(itemCreated))
        .catch(next);
});

// Update route
router.put("/:id", (req, res, next) => {
    Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((updatedItem) => res.status(201).send(updatedItem))
        .catch(next);
});

// Delete route
router.delete("/:id", (req, res, next) => {
    Order.findOneAndDelete({ _id: req.params.id })
        .then((deletedItem) => res.status(200).send(deletedItem))
        .catch(next);
});

module.exports = router;

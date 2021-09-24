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
        .then(items => res.json(items) )
        .catch(next)
});

module.exports = router;
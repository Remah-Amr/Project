const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const Wish = require("../models/wish");
const Item = require("../models/item");

exports.showAllItemInWishList = (req, res, next) => {
    Wish.find()
      .select(" _id")
      .populate("item", "name")
      .exec()
      .then(docs=> {
        res.status(200).json({
          count: docs.length,
          wishs: docs.map(doc => {
            return {
              _id: doc._id,
              item: doc.item,
              request: {
                type: "GET",
                url: "http://localhost:3000/wishs/" + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
};

exports.addToWishList = (req, res, next) => {
    Item.findById(req.body.itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({
          message: "item not found"
        });
      }
      const wish = new Wish({
        _id: mongoose.Types.ObjectId(),
        item: req.body.itemId
      });
      return wish.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "item stored in wish list",
        createdwish: {
          _id: result._id,
          item: result.item
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/wishs/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.getItemInWishList = (req, res, next) => {
   Wish.findById(req.params.wishId)
      .populate("item")
      .exec()
      .then(wish => {
        if (!wish) {
          return res.status(404).json({
            message: "item in wish list not found"
          });
        }
        res.status(200).json({
          wish: wish,
          request: {
            type: "GET",
            url: "http://localhost:3000/wishs"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

  exports.removeItemFromWishList= (req, res, next) => {
   Wish.remove({ _id: req.params.wishId})
      .exec()
      .then(_result => {
        res.status(200).json({
          message: "item deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/wishs",
            body: { itemId: "ID" }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
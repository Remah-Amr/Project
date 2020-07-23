const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const Cart = require("../models/cart");
const Item = require("../models/item");

exports.showItemInCart = (req, res, next) => {
    Cart.find()
      .select(" _id")
      .populate("item", "name")
      .exec()
      .then(docs=> {
        res.status(200).json({
          count: docs.length,
          carts: docs.map(doc => {
            return {
              _id: doc._id,
              item: doc.item,
              request: {
                type: "GET",
                url: "http://localhost:3000/carts/" + doc._id
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

exports.addToCart = (req, res, next) => {
    Item.findById(req.body.itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({
          message: "item not found"
        });
      }
      const cart = new Cart({
        _id: mongoose.Types.ObjectId(),
        item: req.body.itemId
      });
      return cart.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "item stored in cart",
        createdcart: {
          _id: result._id,
          item: result.item
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/carts/" + result._id
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

exports.getItemInCart = (req, res, next) => {
   Cart.findById(req.params.cartId)
      .populate("item")
      .exec()
      .then(cart => {
        if (!cart) {
          return res.status(404).json({
            message: "item in cart not found"
          });
        }
        res.status(200).json({
          cart: cart,
          request: {
            type: "GET",
            url: "http://localhost:3000/carts"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

  exports.removeItem = (req, res, next) => {
    Cart.remove({ _id: req.params.cartId})
      .exec()
      .then(_result => {
        res.status(200).json({
          message: "item deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/carts",
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
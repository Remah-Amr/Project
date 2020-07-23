const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const Fav = require("../models/fav");
const Item = require("../models/item");

exports.showAllItemInFavorite = (req, res, next) => {
    Fav.find()
      .select(" _id")
      .populate("item", "name")
      .exec()
      .then(docs=> {
        res.status(200).json({
          count: docs.length,
          favs: docs.map(doc => {
            return {
              _id: doc._id,
              item: doc.item,
              request: {
                type: "GET",
                url: "http://localhost:3000/favs/" + doc._id
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

exports.addToFavorite = (req, res, next) => {
    Item.findById(req.body.itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({
          message: "item not found"
        });
      }
      const fav = new Fav({
        _id: mongoose.Types.ObjectId(),
        item: req.body.itemId
      });
      return fav.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "item stored in favorite",
        createdfav: {
          _id: result._id,
          item: result.item
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/favs/" + result._id
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

exports.getItemInFavorite = (req, res, next) => {
   Fav.findById(req.params.favId)
      .populate("item")
      .exec()
      .then(fav => {
        if (!fav) {
          return res.status(404).json({
            message: "item in favorite not found"
          });
        }
        res.status(200).json({
          fav: fav,
          request: {
            type: "GET",
            url: "http://localhost:3000/favs"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

  exports.removeItem= (req, res, next) => {
   Fav.remove({ _id: req.params.favId})
      .exec()
      .then(_result => {
        res.status(200).json({
          message: "item deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/favs",
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
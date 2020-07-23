const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const Recent = require("../models/recent");
const Item = require("../models/item");

exports.showItemsInRecentView = (req, res, next) => {
    Recent.find()
      .select(" _id")
      .populate("item", "name")
      .exec()
      .then(docs=> {
        res.status(200).json({
          count: docs.length,
          recents: docs.map(doc => {
            return {
              _id: doc._id,
              item: doc.item,
              request: {
                type: "GET",
                url: "http://localhost:3000/recents/" + doc._id
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

exports.addToRecentView = (req, res, next) => {
    Item.findById(req.body.itemId)
    .then(item => {
      if (!item) {
        return res.status(404).json({
          message: "item not found"
        });
      }
      const recent = new Recent({
        _id: mongoose.Types.ObjectId(),
        item: req.body.itemId
      });
      return recent.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "item stored in recent view",
        createdrecent: {
          _id: result._id,
          item: result.item
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/recents/" + result._id
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

exports.getItemInRecentView = (req, res, next) => {
   Recent.findById(req.params.recentId)
      .populate("item")
      .exec()
      .then(recent => {
        if (!recent) {
          return res.status(404).json({
            message: "item in recent view not found"
          });
        }
        res.status(200).json({
            recent: recent,
          request: {
            type: "GET",
            url: "http://localhost:3000/recents"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };
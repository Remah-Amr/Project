const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const cloud = require('../../cloudinaryConfig')
const Item = require("../models/item");




//get all items for everyone
exports.items_get_all = (req, res, next) => {
    Item.find()
      .select("categoryName name price _id itemImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              categoryName : doc.categoryName,  
              name: doc.name,
              price: doc.price,
              itemImagge: doc.itemImage,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/items/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  exports.items_create_item = async (req, res, next) => {
    console.log('here')
    const p = await cloud.uploads(req.files[0].path)
    console.log(p)
    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      categoryName: req.body.categoryName,
      name: req.body.name,
      price: req.body.price,
      itemImagge: p.url
    });
    item
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created item successfully",
          createditem: {
            categoryName:result.categoryName,
            name: result.name,
            price: result.price,
            itemImagge:result.itemImagge,
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/items/" + result._id
            }
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
   
  exports.items_get_item = (req, res, next) => {
    const id = req.params.itemId;
    Item.findById(id)
      .select("catagoryName name price _id itemImage")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            item: doc,
            request: {
              type: "GET",
              url: "http://localhost:3000/items"
            }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

  exports.items_update_item = async (req, res, next) => {
    const id = req.params.itemId;
    let item = await Item.findById(id)
    await item.set(req.body).save()
    return res.status(200).json(item)
    // const updateOps = {};
    // for (const ops of req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    // Item.update({ _id: id }, { $set: updateOps })
    //   .exec()
    //   .then(_result => {
    //     res.status(200).json({
    //       message: "item updated",
    //       request: {
    //         type: "GET",
    //         url: "http://localhost:3000/item/" + id
    //       }
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //       error: err
    //     });
    //   });
  };
  
  exports.item_delete = (req, res, next) => {
    const id = req.params.itemId;
    Item.findById(id).then(existItem => {
      if(!existItem) 
        return res.status(404).json({msg: "item not found"})
      else
      Item.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "item deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/items",
            body: { name: "String", price: "Number" }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    })
    
  };
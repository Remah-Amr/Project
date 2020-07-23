const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middelware/check-auth');
const ItemController = require('../controllers/item');
const multerConfig = require('../../multer')

/*const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
});
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
*/

router.get("/", ItemController.items_get_all);

router.post("/", multerConfig, ItemController.items_create_item );

router.get("/:itemId", ItemController.items_get_item);

router.patch("/:itemId",  ItemController.items_update_item);

router.delete("/:itemId", ItemController.item_delete);



module.exports = router;
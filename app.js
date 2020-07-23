
const express = require("express");
const app = express();
const morgan = require("morgan");
const imageModel = require('./api/models/images');
const multer = require("./multer");
const multerConfig = require('./multer');

const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
const dbconnection = require('./api/config/config');

dbconnection();

const userRoutes = require('./api/routes/user');
const itemRoutes = require('./api/routes/item');
const orderRoutes = require("./api/routes/order");
const cartRoutes = require("./api/routes/cart");
const favRoutes = require("./api/routes/fav");
const recentRoutes = require("./api/routes/recent");
const wishRoutes = require("./api/routes/wish");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
//app.use('/uploads', express.static('uploads'));
app.use('/images',express.static('images'))


app.post('/myImages',multerConfig , async (req,res)=>{

    const result = await cloud.uploads(req.files[0].path)

    const imageDetails = {
        imageName : req.files[0].originalname ,
        url : result.url
    }
    const image = new imageModel(imageDetails)
    image.save()

    // delete image local
    fs.unlinkSync(req.files[0].path)

    res.json({
        msg : "DONE",
        image: image
    })
})

app.get('/myImages',async (req,res)=>{
    const images = await imageModel.find()
    res.json(images)
})

app.listen(8080,()=>{
    console.log('server started successfully')
})


app.use("/", userRoutes);
app.use("/items",itemRoutes);
app.use("/orders", orderRoutes);
app.use("/carts", cartRoutes);
app.use("/favs", favRoutes);
app.use("/recents", recentRoutes);
app.use("/wishs", wishRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;

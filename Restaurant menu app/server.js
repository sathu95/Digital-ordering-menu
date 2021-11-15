const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://rootsathu:rootsathu@cluster.caajl.mongodb.net/restaurantstest?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!");
});

const schema = mongoose.Schema;
const itemsSchema = new schema({
  restaurantName: String,
  section: Array,
  createdDate: Date,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const item = mongoose.model("Items", itemsSchema);
app.get("/api/get", (req, res) => {
  res.send("Get");
});

app.get("/api/menu-items", (req, res) => {
  item
    .aggregate([
      {
        $sort: {
          createdDate: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 1,
          section: 1,
          restaurantName: 1,
        },
      },
    ])
    .then((data) => {
      return res.status(200).json({
        status: true,
        message: "Menu list",
        restaurant_menu: data,
      });
    })
    .catch((err) => {
      error.errorM(res, {
        action_type: "menu-list",
        error_data: err,
      });
      return res.status(200).json({
        status: false,
        message: "Something went wrong.",
      });
    });
});

app.get("/api/menu-items/:id", (req, res) => {
  item
    .aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $sort: {
          createdDate: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 1,
          section: 1,
          restaurantName: 1,
        },
      },
    ])
    .then((data) => {
      return res.status(200).json({
        status: true,
        message: "Menu list",
        restaurant_menu: data[0],
      });
    })
    .catch((err) => {
      error.errorM(res, {
        action_type: "menu-list",
        error_data: err,
      });
      return res.status(200).json({
        status: false,
        message: "Something went wrong.",
      });
    });
});

app.listen(5002, function () {
  console.log("server is running");
});

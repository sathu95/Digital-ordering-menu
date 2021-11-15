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
  // item: String,
  // price: String,
  // description: String,
});

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
const item = mongoose.model("Items", itemsSchema);
app.get("/api/get", (req, res) => {
  res.send("Get");
});

app.post("/api/add", (req, res) => {
  const { restaurantName, sections } = req.body;
  var details = new item();
  details.restaurantName = restaurantName;
  details.section = sections;

  details.save((err, doc) => {
    if (!err) {
      return res.status(200).json({
        status: true,
        message: "Details has been added successfully.",
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Something went wrong!",
      });
    }
  });
});

// const data = {
//   section: "Pasta",
//   item: "Pasta",
//   price: "$9",
//   description: "Spicy and saucy",
// };

// const newItem = new item(data);

// newItem.save((error) => {
//   if (error) {
//     console.log("Ooops, something happened");
//   } else {
//     console.log("Data has been saved");
//   }
// });

app.listen(5000, function () {
  console.log("server is running");
});

var mongoose = require("mongoose");

var weatherSchema = mongoose.Schema({
  nomVille: String,
  urlImage: String,
  descriptif: String,
  tempMin: Number,
  tempMax: Number,
  longitude: Number,
  latitude: Number,
});

var weatherModel = mongoose.model("weathers", weatherSchema);

module.exports = { weatherModel };

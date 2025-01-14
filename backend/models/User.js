const mongoose = require("mongoose");

const MovieDetailsSchema = new Schema({
    rating: { type: Number, required: true, min: 0, max: 10 }, // Rating between 0 and 10
    notes: { type: String, default: "" } // Optional notes
  });
  
  // Main User schema
  const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    watched_movies: {
      type: Map,
      of: MovieDetailsSchema, // Use the nested schema for movie details
      required: false
    },
    wishlist: {type: [String], required: false}
  });

module.exports = mongoose.model("User", userSchema)


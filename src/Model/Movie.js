import { model, Schema } from "mongoose";

const MovieSchema = new Schema({
  director: { type: String, required: true },
  year: { type: String, required: true },
  country: { type: String, required: true },
});

const Movie = model("Movie", MovieSchema);

export default Movie;

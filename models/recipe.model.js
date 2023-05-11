const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
	{
		name: { type: String, required: true },
		image: { type: String },
		ingredients: { type: Array, required: true },
		instructions: { type: String, required: true },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

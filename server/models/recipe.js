const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

    recipe_name:String,
    description:String,
    spices:String,
    ingredients:String,
    directions:String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
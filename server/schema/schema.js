const graphql = require('graphql');
const _= require('lodash');

const Recipe = require('../models/recipe');


const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull}= graphql;

// Defining types

//Recipe type
const RecipeType = new GraphQLObjectType({
    name:'Recipe',
    fields:()=>({
        recipe_name:{type:GraphQLString},
        description:{type:GraphQLString},
        spices:{type:GraphQLString},
        ingredients:{type:GraphQLString},
        directions:{type:GraphQLString}
    })
});


// Root Queries type
const RootQuery = new GraphQLObjectType({

    name:'RootQueryType',

    fields:{

        // Search recipe by name
        recipe:{
          type: RecipeType,
          args:{recipe_name:{type:GraphQLString}},
          resolve(parent, args){
              return Recipe.findOne({recipe_name:args.recipe_name});
          }
        },

        // Search recipe in database by ingredient
       RecipeByIngredient:{
           type:new GraphQLList(RecipeType),
           args:{ingredients:{type:GraphQLString}},
           resolve(parent, args){
               return Recipe.find({ingredients: {"$regex": args.ingredients, "$options": "i"}});
           }
       },

        // Search recipe in database by spice
        RecipeBySpice:{
            type:new GraphQLList(RecipeType),
            args:{spices:{type:GraphQLString}},
            resolve(parent, args){
                return Recipe.find({spices: {"$regex": args.spices, "$options": "i"}});
            }
        },

        // Query all recipes
        AllRecipes:{
            type:new GraphQLList(RecipeType),
            resolve(parent,args){
                //return myRecipes
                return Recipe.find({});
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{

        addRecipe:{
            type:RecipeType,
            args:{
                recipe_name:{type:new GraphQLNonNull(GraphQLString)},
                description:{type:new GraphQLNonNull(GraphQLString)},
                spices:{type:new GraphQLNonNull(GraphQLString)},
                ingredients:{type:new GraphQLNonNull(GraphQLString)},
                directions:{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let recipe = new Recipe({
                    recipe_name:args.recipe_name,
                    description:args.description,
                    spices:args.spices,
                    ingredients:args.ingredients,
                    directions:args.directions,
                });
                return recipe.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});

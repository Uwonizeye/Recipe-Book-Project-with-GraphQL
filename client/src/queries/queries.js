// This file is created to separate queries from specific components, so they are more accessible

import {gql} from 'apollo-boost';

// Query to get all recipes
const getRecipesQuery = gql`
    {
        AllRecipes{
            recipe_name
            description
            spices
            ingredients
            directions
        }
    }
    
`

//Query to get one recipe
const getRecipeQuery = gql`
   query($recipe_name:String){
        recipe(recipe_name:$recipe_name){
            recipe_name
            description
            spices
            ingredients
            directions
        }
   }
`

//AddRecipeMutation

const addRecipeMutation = gql`
    mutation($recipe_name:String!, $description:String!, $spices:String!, $ingredients:String!, $directions:String!){
        addRecipe(recipe_name:$recipe_name, description:$description, spices:$spices, ingredients:$ingredients, directions:$directions){
            recipe_name
            description
            spices
            ingredients
            directions
        }
    }
`


export {getRecipesQuery, getRecipeQuery, addRecipeMutation};
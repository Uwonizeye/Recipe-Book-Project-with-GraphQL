import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import{getRecipeQuery} from '../queries/queries';

class RecipeDetails extends Component {

displayRecipeDetails()
    {
    const {recipe} = this.props.data;
    if(recipe){
        return(
            <div>
                <h2>Recipe: {recipe.recipe_name}</h2>
                <p>Description: {recipe.description}</p>
                <p>Spices: {recipe.spices}</p>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Directions: {recipe.directions}</p>
            </div>
        )
    }else{
        return(
            <div> Click on individual recipe to see details...</div>
        )
    }
}

// Render function

    render(){

        return(
            <div id="recipe-details">
                {this.displayRecipeDetails()}
            </div>
        );
    }
}

export default graphql(getRecipeQuery,{
    options:(props)=> {
        return {
            variables: {
                recipe_name: props.recipeName
            }
        }
    }
})(RecipeDetails);
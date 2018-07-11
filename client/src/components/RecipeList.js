import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import{getRecipesQuery} from '../queries/queries';

//Components
import RecipeDetails from './RecipeDetails';
import AddRecipe from './AddRecipe';

class RecipeList extends Component {

    //Constructor
    constructor(props){
        super(props);
        this.state ={
            selected:null
        }
    }

    displayRecipe(){
        let data = this.props.data;
        if(data.loading){
            return (<div> Loading Recipes...</div>)
        }else{
            return data.AllRecipes.map(recipe =>{
                return(
                    <li key={recipe.recipe_name} onClick={(e)=> {this.setState({selected:recipe.recipe_name})}}>{recipe.recipe_name}</li>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <ul name="recipe-list">
                    {this.displayRecipe()}
                </ul>
                <RecipeDetails recipeName={this.state.selected}/>
                <AddRecipe/>
        </div>
    );

    }
}

export default graphql(getRecipesQuery)(RecipeList);

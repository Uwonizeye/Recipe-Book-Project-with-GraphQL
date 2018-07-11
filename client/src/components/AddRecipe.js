import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import{addRecipeMutation,getRecipesQuery } from '../queries/queries';



class AddRecipe extends Component{

    //Constructor
    constructor(props){
        super(props);
        this.state = {
            recipe_name:'',
            description:'',
            spices:'',
            ingredients:'',
            directions:''
        };
    }

    //Function to submit form in order to add recipe

    submitForm(e){
        e.preventDefault();
        this.props.addRecipeMutation({
            variables:{
                recipe_name:this.state.recipe_name,
                description:this.state.description,
                spices:this.state.spices,
                ingredients:this.state.ingredients,
                directions:this.state.directions
            },
            refetchQueries:[{query:getRecipesQuery}] //update the recipes as soon as one is added to the list
        });
    }

    //Function to render options

    render(){
        return(
            <form id="add-recipe" onSubmit={this.submitForm.bind(this)}>

                <div className="field">
                    <p> Add a recipe </p>
                    <label> Name:</label>
                    <input type="text" onChange={(e)=> this.setState({recipe_name:e.target.value})}/>
                </div>

                <div className="field">
                    <label> Description:</label>
                    <input type="text" onChange={(e)=> this.setState({description:e.target.value})}/>
                </div>

                <div className="field">
                    <label> Spices:</label>
                    <input type="text" onChange={(e)=> this.setState({spices:e.target.value})}/>
                </div>

                <div className="field">
                    <label> Ingredients:</label>
                    <input type="text" onChange={(e)=> this.setState({ingredients:e.target.value})}/>
                </div>

                <div className="field">
                    <label> Directions:</label>
                    <input type="text" onChange={(e)=> this.setState({directions:e.target.value})}/>
                </div>

                <button> + </button>

            </form>
        );
    }
}

export default compose(
    graphql(addRecipeMutation,{name:"addRecipeMutation"}),
    graphql(getRecipesQuery,{name:"getRecipesQuery"})
)(AddRecipe);
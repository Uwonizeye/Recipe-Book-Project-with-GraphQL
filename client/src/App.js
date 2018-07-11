import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// Components
import RecipeList from './components/RecipeList';

//Apollo client set-up
const client = new ApolloClient({
    uri:'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
      <div id="main">
        <h1> Family Recipes</h1>
        <RecipeList/>

      </div>
      </ApolloProvider>
    );
  }
}

export default App;

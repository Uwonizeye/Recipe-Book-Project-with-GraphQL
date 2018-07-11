const express = require('express');
const graphqlHTTP = require('express-graphql'); // end point that facilitates communication between express and graphql
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Allow cross origin request (allow both servers to communicate)
app.use(cors());

// Connect to database
mongoose.connect('mongodb://user2:test123@ds219191.mlab.com:19191/gql-my-recipes');

// Import JSON recipe data into the database


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',()=>{
    console.log('Connected to the database, Woot Woot!');
});

//middleware that takes in a 'schema' that determines how the graph will look
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,()=>{
    console.log('now listening on PORT 4000');

});
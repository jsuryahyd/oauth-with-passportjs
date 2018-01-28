const mongoose = require('mongoose');

/*
- define a schema(structure) of our collection,
*/
const userSchema = mongoose.Schema({
    displayName:String,
    googleID:String
});

/*
- a mongoose model is a mongodb collection interface
- @params - name of the collection , schema of the collection
- mongoose(?) sets the collection name to plural of the given model name.
*/
const User = mongoose.model('user',userSchema); 

module.exports = User;

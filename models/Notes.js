const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : [true , "User is required"]
    },
    title : {
        type : String ,
        required : [true , "Title is required"],
        trim :true,
        maxLength:[100,"Title cannot be exceed 100 characters"]
    },
    content : {
        type : String ,
        required : [true , "Content is required"],
        trim : true 
    }
}, {timestamps : true});

module.exports = mongoose.model("Note",NoteSchema);

const mongoose=require('mongoose')
const Schema=mongoose.Schema;


// Craete Structure

const IdeaSchema=new Schema({
    Name:{
        type:String,
        required:true
    },
    Number:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
mongoose.model('Contact',IdeaSchema)
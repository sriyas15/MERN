import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true});

const List = mongoose.model("List",listSchema);

export default List;
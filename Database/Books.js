const mongoose=require("mongoose")

//create book schema
const BookSchema=mongoose.Schema(
    {
        isbn: String,
        title: String,
        pubdate:String,
        language:String,
        numpage: Number,
        author: [Number],
        publication: [Number],
        category: [String]
    }
);

const BookModel=mongoose.model("books",BookSchema);

module.exports=BookModel;
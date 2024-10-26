import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [4, "First Name Must Contain At Lest 4 Characters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [4, "Last Name Must Contain At Lest 4 Characters!"]
    },
    email:{
        type:String,
        required: true,
        validator: [validator.isEmail, "Please provide A valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength: [10, "phone most Contain 10 digites"],
        mixLength: [10, "phone most Contain 10 digites"],
    },
    message:{
        type:String,
        required:true,
        minLength: [10, "Message most Contain 10 Characters!"],
    },
    
});

export const Message = mongoose.model("Message", messageSchema);
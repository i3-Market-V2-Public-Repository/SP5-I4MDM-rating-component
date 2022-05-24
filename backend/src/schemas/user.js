import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
const userSchema  = new mongoose.Schema({
    did:{
        type: String,
        unique: true,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        lowercase: true
    }
},{timestamps:true, autoIndex:true})

userSchema.plugin(uniqueValidator);

export default userSchema
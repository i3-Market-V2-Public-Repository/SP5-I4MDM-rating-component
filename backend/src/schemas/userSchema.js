import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
const userSchema  = new mongoose.Schema({
    did:{
        type: String,
        unique: true,
        required: true,
    },
    pk:{
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
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/, "Invalid email address"]
    }
},{timestamps:true, autoIndex:true})

userSchema.plugin(uniqueValidator);
userSchema.pre('findOneAndUpdate', function(next){
    this.setOptions({runValidators: true, new: true})
    next()
})

export default userSchema
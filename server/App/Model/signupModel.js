import mongoose from "mongoose";

let signUpSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    fatherName: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 60
    },
    phoneNo: {
        type: Number,
        unique: [true, "contact number is already exceted"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "this email have a account"]
    
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
})

let signUpModel = mongoose.model("signup", signUpSchema)

export default signUpModel
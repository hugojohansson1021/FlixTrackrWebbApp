import mongoose, { Schema } from "mongoose";
var userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, { strict: true });
userSchema.methods.fullName = function () {
    return "".concat(this.name.first, " ").concat(this.name.last);
};
export var UserModel = mongoose.models.UserModel ||
    mongoose.model("UserModel", userSchema, "users");

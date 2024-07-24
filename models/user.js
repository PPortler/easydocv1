import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        phone:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            require: true,
            default: "User"
        }
    },
    {
        timestamps: true
    }
)

const Users = mongoose.models.Users || mongoose.model("Users",UserSchema);
export default Users
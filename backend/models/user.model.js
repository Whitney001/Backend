import mongoose,{Schema, Types} from "mongoose";
import bcrypt from "bcrypt"; // to compare password to hash password and must be installed

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 1,
        maxLength: 30,

    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 30,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    
    
},

{
    timestamps: true
}



)

// before saving any password we need to hash it 
userSchema.pre('save', async function ()  {
    if (!this.isModified('password')) 
        return next();
    
    this.password = await bcrypt.hash(this.password, 10);
});

// compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)
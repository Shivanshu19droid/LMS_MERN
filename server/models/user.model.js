import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config();
import crypto from 'crypto';
import { type } from "os";

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, "Name is required"],
        minLength: [5, "Name must be at least 5 "],
        maxLength: [50, "Name should be less than 50 characters"],
        lowercase: true,
        trim: true
    },
    email: {
        type: 'String',
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill in a valid email address"]
    },
    password: {
        type: 'String',
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false //while returning the response, password would not be sent/ displayed
    },
    avatar: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
        id: String,
        status: String
    },
    stripeCustomerId: {
        type: 'String'
    }
}, {
    timestamps: true
}
);

//this segment handles the ecryption of the password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    generateJWTToken: async function(){
        return await jwt.sign(
            { id: this._id, email: this.email, subscription: this.subscription, role: this.role},
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword, this.password);
    },

    generatePasswordResetToken: async function () {
        //crypto here will be used to encrypt the token before storing it into the DB

        const resetToken = crypto.randomBytes(20).toString('hex');

        //encryption logic using crypto
        this.forgotPasswordToken = crypto
              .createHash('sha256')
              .update(resetToken)
              .digest('hex');

        this.forgotPasswordExpiry = Date.now() + 15*60*1000; //15 min from now

        return resetToken;
    }
}

const User = model('User', userSchema);

export default User;
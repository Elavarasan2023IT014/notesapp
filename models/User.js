const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name is Required"],
        trim : true,
        maxlength:[50,"Name cannot exceed 50 characters"]
    },
    email : {
        type : String,
        required : [true,"Email is Required"],
        trim : true,
        unique : true,
        lowercase : true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password : {
        type : String,
        required : [true,"Password is Required"],
        minlength:[6,"Password must be at least 6 characters"]
    }
},{ timestamps:true});

UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User',UserSchema);
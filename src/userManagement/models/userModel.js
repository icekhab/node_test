const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { Schema } = mongoose;

/**
 * User Schema
 */
const userSchema = new Schema({
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    login: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    jwtSecret: {
        type: String,
        required: true,
        select: false,
        default: () => crypto.randomBytes(256).toString('hex'),
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function beforeSave(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);

        this.set('password', hash);
    }

    next();
});


module.exports.User = mongoose.model('User', userSchema);
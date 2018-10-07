const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = Schema({
    name: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});

roleSchema.virtual('id').get(function getId() {
// eslint-disable-next-line no-underscore-dangle
    return this._id;
});


module.exports.Role = mongoose.model('Role', roleSchema);

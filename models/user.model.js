const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email);
}

let addressSchema = new Schema({
    area: {type: String},
    road: {type: String}
}, {_id: false});    //Επειδή το θεωρεί document αφαιρώ το id

let phoneSchema = new Schema({
    type: {type: String},
    number: {type: String}
}, {_id: false});    //Επειδή το θεωρεί document αφαιρώ το id

let productSchema = new Schema({
    product: {type: String},
    cost: {type: Number},
    quantity: {type: Number},
    date: {type: Date, default: Date.now}
}, {_id: false});

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is a required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is a required field'],
        max: 100
    },
    name: {
        type: String,
        max: 100
    },
    surname: {
        type: String,
        max: 100
    },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Email address is not valid']     //instead of match: [ , '']
        // match: [
        //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,     //instead of validate: [ , '']
        //     'Email address is not valid'
        // ]
    },
    address: addressSchema,
    phone: {type: [phoneSchema], null: true},
    products: {type: [productSchema], null: true}
}, {
    collection: 'users',
    timestamps: true
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
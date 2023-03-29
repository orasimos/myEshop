const User = require('../models/user.model');

// -------Logger------
const logger = require('../logger/logger');

exports.findAll = function (req, res) {
    console.log('Find all users requested');

    User.find({}, (err, results) => {
        if (err) {
            res.status(400).json({status: false, data: err});
            logger.error("Error in reading all users", err);
            console.log('Error in reading users', err);
        } else {
            res.status(200).json({status: true, data: results});
            console.log('Success in reading users');
            logger.info("Success in reading users");
            logger.warn("Warn in reading all users");
            logger.error("Error in reading all users");
            logger.debug("Debug in reading all users");
        }
    });
};

exports.findOne = function (req, res) {
    const username = req.params.username;

    console.log('Find user using username', username);
    
    User.findOne({username: username}, (err, results) => {
        if (err) {
            res.status(400).json({status: false, data: err});
            console.log(`User <${username}> not found`, err);
        } else {
            res.status(200).json({status: true, data: results});
            console.log(`User <${username}> successfully found`);
        }
    });
};

exports.create = function (req, res) {
    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    });

    console.log('Insert user with username', req.body.username);

    newUser.save((err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err});
            console.log(`Error in creating user <${username}>`, err);
        } else {
            res.status(200).json({status: true, data: result});
            console.log(`User <${username}> created successfully`);
        };
    });
};

exports.update = function (req, res) {
    const username = req.body.username;
    
    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    };

    User.findOneAndUpdate({username: username}, updateUser, {new: true}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err});
            console.log(`Error in updating user <${username}>`, err);
        } else {
            res.status(200).json({status: true, data: result});
            console.log(`User <${username}> updated successfully`);
        };
    });
};

exports.delete = function (req, res) {
    const username = req.params.username;

    console.log('Delete user', username);

    User.findOneAndDelete({username: username}, (err, result) => {
        if (err) {
            res.status(400).json({status: false, data: err});
            console.log(`Error in deleting user <${username}>`, err);
        } else {
            res.status(200).json({status: true, data: result});
            console.log(`User <${username}> deleted successfully`);
        };
    });
};
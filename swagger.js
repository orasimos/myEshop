const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
    "definitions": {
        User: m2s(User),
        Product: m2s(Product)
    },
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "description": "Products Project Application API",
        "title": "Products CRUD API"
    },
    "host": "localhost:3000",
    "basePath": "/",
    "tags": [
        {
            "name": "Users",
            "description": "API for users"
        },
        {
            "name": "Users and Products",
            "descrition": "API for users and their products"
        },
        {
            "name": "Produts",
            "description": "API for products"
        }
    ],
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"],
    "paths": {
        "/api/user/findAll": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get all users from the Database",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/User"
                        }
                    }
                }
            }
        },
        "/api/user/findOne/{username}": {
            "get": {
                "tags": [
                    "Users"
                ],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user",
                        "type": "string"
                    }
                ],
                "summary": "Get all users from system",
                "responses": {
                    "200": {
                        "description": "User find",
                        "schema": {
                            "$ref": "#/definitions/User"
                        }
                    }
                }
            }
        },
        "/api/user/create": {
            "post": {
                "tags": [
                    "Users"
                ],
                "description": "Create new user in the database",
                "parameters": [{
                    "name": "Parameters for user creation",
                    "in": "body",
                    "description": "Users parameters that we will create",
                    "schema": {
                        // "$ref": "#/definitions/User"
                        "type": "object",
                        "properties": {
                            "username": {"type": "string"},
                            "password": {"type": "string"},
                            "name": {"type": "string"},
                            "surname": {"type": "string"},
                            "email": {"type": "string"},
                            "address": {
                                "type": "object",
                                "properties": {
                                    "area": {"type": "string"},
                                    "road": {"type": "string"}
                                }
                            },
                            "phone": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "type": {"type": "string"},
                                        "number": {"type": "string"}
                                    }
                                }
                            }
                        },
                        "required": ["username", "email"]
                    }
                }],
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "New user created successfully",
                        // "schema": {
                        //     "$ref": "#/definitions/User"
                        // }
                    }
                }
            }
        },
        "/api/user/update": {
            "patch": {
                "tags": [
                    "Users"
                ],
                "description": "Update user in database",
                "parameters": [{
                    "name": "update user in database",
                    "in": "body",
                    "description": "User to be updated",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "username": {"type": "string"},
                            "name": {"type": "string"},
                            "surname": {"type": "string"},
                            "email": {"type": "string"},
                            "address": {
                                "type": "object",
                                "properties": {
                                    "area": {"type": "string"},
                                    "road": {"type": "string"}
                                }
                            },
                            "phone": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "type": {"type": "string"},
                                        "number": {"type": "string"}
                                    }
                                }
                            }
                        },
                        "required": ["username", "email"]
                    }
                }],
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "User updated successfully"
                    }
                }
            }
        },
        "/api/user/delete/{username}": {
            "delete":{
                "tags": [
                    "Users"
                ],
                "description": "Deletes the specified user from the database",
                "parameters": [{
                    "name": "username",
                    "in": "path",
                    "decritpion": "Username of user to be deleted"
                }],
                "responses": {
                    "200": {
                        "description": "User deleted successfully"
                    }
                }
            }
        },
        "/api/userproducts/findone/{username}": {
            "get": {
                "tags": [
                    "Users and Products"
                ],
                "parameters": [{
                    "name": "username",
                    "in": "path",
                    "descritpion": "Find a user's product",
                    "type": "string"
                }],
                "responses": {
                    "200": {
                        "description": "User and products found"
                    }
                }
            }
        }
    }
}

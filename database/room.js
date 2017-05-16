var mongoose = require('mongoose');

var room = {};

var database;
var RoomSchema;
var RoomModel;

function createSchemaAndModel() {
    RoomSchema = mongoose.Schema({
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        create_time: {
            type: Date,
            'default': Date.now
        },
        update_time: {
            type: Date,
            'default': Date.now
        }
    });
    console.log("RoomSchema is initialized.");

    RoomModel = mongoose.model("room", RoomSchema);
    console.log("RoomModel is initialized.");
}

room.connect = function (config) {
    mongoose.connect(config.url + "/room");
    database = mongoose.connection;

    database.on('open', function () {
        createSchemaAndModel();
    });
    database.on('disconnected', room.connect);
    database.on('error', function (err) {
        console.log("Error from mongoose.");
        console.error(err);
    });
};

module.exports = room;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var room = {};

var database;
var RoomSchema;
var RoomModel;

function createSchemaAndModel() {
    RoomSchema = new Schema({
        title: {type: String},
        create_time: {type: Date, default: Date.now},
        update_time: {type: Date, default: Date.now}
    });
    console.log("RoomSchema is initialized.");

    RoomModel = mongoose.model("room", RoomSchema);
    console.log("RoomModel is initialized.");
}

room.connect = function (config) {
    mongoose.connect(config.url + "/room");
    database = mongoose.connection;

    database.on('error', console.error.bind(console, "Error from mongoose : "));
    database.once('open', function () {
        createSchemaAndModel();
    });
    database.on('disconnected', room.connect);
};

room.create = function (title, callback) {
    var room = new RoomModel();
    room.title = title;
    room.create_time = Date.now();
    room.update_time = room.create_time;

    room.save(function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, room);
    });
};

room.findAll = function (callback) {
    RoomModel.find(callback);
};

module.exports = room;
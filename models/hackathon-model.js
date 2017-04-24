var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hackathonSchema = new Schema({
    id: {type: Number, required: true},
    uuid: {type: String, required: true},
    Data: {type: Object, required: true}
});

module.exports = mongoose.model('Hackathon', hackathonSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hackathonSchema = new Schema({
    _id: {type: Number, required: true},
    uuid: {type: String, required: true},
    Data: {type: Object, required: true},
    organisers: [String],
    volunteers: [String],
    participants: [String],
    mentors: [String]
});

module.exports = mongoose.model('Hackathon', hackathonSchema);

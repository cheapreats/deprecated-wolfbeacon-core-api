var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: {type: String, required: true},
    organising: [String],
    volunteering: [String],
    participating: [String],
    mentoring: [String]
});

module.exports = mongoose.model('User',userSchema);
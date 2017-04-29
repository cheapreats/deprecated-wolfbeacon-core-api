import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
    _id: {type: Number, required: true},
    uuid: {type: String, required: true},
    Data: {type: Object, required: true},
    organisers: [String],
    volunteers: [String],
    participants: [String],
    mentors: [String]
});


export default mongoose.model('Hackathon', hackathonSchema);

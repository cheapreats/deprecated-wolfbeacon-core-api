import mongoose from 'mongoose';

const hackathonSchema = new mongoose.Schema({
    hackathonId: {type: Number, required: true},
    uuid: {type: String, required: true},
    data: {type: Object, required: true},
    isPublished: {type: Boolean, default: false},
    organisers: [String],
    volunteers: [String],
    participants: [String],
    mentors: [String]
});


export default mongoose.model('Hackathon', hackathonSchema);

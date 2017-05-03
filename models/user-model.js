import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    organising: [String],
    volunteering: [String],
    participating: [String],
    mentoring: [String]
});

export default mongoose.model('User',userSchema);
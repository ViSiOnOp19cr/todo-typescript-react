import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});

export const TagModel = mongoose.model('Tag', tagSchema);

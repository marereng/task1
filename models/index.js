import mongoose from 'mongoose';
import PostSchema from './schemas/board.js';

// Creating a model
export const Post = mongoose.model('Post', PostSchema);
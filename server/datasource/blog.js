import Mongoose from 'mongoose';

const BlogSchema = Mongoose.Schema({
  title: String,
  writtenBy: { _id: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Blog = Mongoose.model('blogs', BlogSchema);

export default Blog;

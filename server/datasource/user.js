import Mongoose from 'mongoose';

const UserSchema = Mongoose.Schema({
  email: String,
  password: String,
  name: String,
  createdAt: Date,
});

const User = Mongoose.model('users', UserSchema);

export default User;

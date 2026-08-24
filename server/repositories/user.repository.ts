import type mongoose from 'mongoose';
import User from '../models/user.model';

interface FindUserByIdParams {
  userId?: mongoose.Types.ObjectId;
  selectPassword?: boolean;
}

interface FindUserParams {
  searchString?: string;
  searchBy?: 'userName' | 'email';
}

const userRepository = {
  async findUserById(
    { userId, selectPassword }: FindUserByIdParams = {
      selectPassword: false,
    }
  ) {
    if (selectPassword) {
      return User.findById(userId);
    } else {
      return User.findById(userId).select('-password');
    }
  },
  async findUser(
    { searchString, searchBy }: FindUserParams = {
      searchBy: 'userName',
    }
  ) {
    const trimmedSearchString = searchString?.trim();
    const user = await User.findOne({ [`${searchBy}`]: trimmedSearchString });
    return user;
  },
};

export default userRepository;

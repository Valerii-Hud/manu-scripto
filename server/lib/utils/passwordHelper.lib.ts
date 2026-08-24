import bcrypt from 'bcryptjs';

const passwordHelper = {
  isPasswordCorrect(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  },
};

export default passwordHelper;

import bcrypt from 'bcryptjs';

const passwordHelper = {
  async isPasswordCorrect(password: string, passwordHash: string) {
    const isCorrect = await bcrypt.compare(password, passwordHash);
    console.log(`is correct ${isCorrect}`);
    return isCorrect;
  },
};

export default passwordHelper;

import mongoose from 'mongoose';
import { isError } from '../../types/guards.types';

export default async function connectToMongoDB(mongoUri: string | undefined) {
  try {
    if (typeof mongoUri === 'undefined') {
      throw new Error(`Please provide MongoDB connection string`);
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    if (isError(error)) {
      console.log(`MongoDB connected failed: ${error.message}`);
      process.exit(1);
    }
  }
}

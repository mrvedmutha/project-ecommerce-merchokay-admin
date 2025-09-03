import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

// Create MongoDB client and database instance
const client = new MongoClient(MONGODB_URI);
const db = client.db('merchokay-admin');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'editor',
      },
      permissions: {
        type: 'string[]',
        required: false,
        defaultValue: [],
      },
      isActive: {
        type: 'boolean',
        required: false,
        defaultValue: true,
      },
      lastLogin: {
        type: 'date',
        required: false,
      },
    },
  },
});

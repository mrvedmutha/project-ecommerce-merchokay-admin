import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

export const auth = betterAuth({
  database: mongodbAdapter(client, {
    databaseName: "merchokay-admin",
  }),
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
        type: "string",
        required: false,
        defaultValue: "editor",
      },
      permissions: {
        type: "string[]",
        required: false,
        defaultValue: [],
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
      },
      lastLogin: {
        type: "date",
        required: false,
      },
    },
  },
})
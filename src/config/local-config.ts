import { registerAs } from '@nestjs/config';

export default registerAs('local', () => ({
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  redis: {
    redisUrl: process.env.REDIS_URL,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
}));

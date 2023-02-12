export default {
  SECRET_KEY: String(process.env.JWT_SECRET ?? ''),
  EXPIRES_IN: '1d',
};

export default {
  CLIENT_ID: String(process.env.GITHUB_CLIENT_ID ?? ''),
  CLIENT_SECRET: String(process.env.GITHUB_CLIENT_SECRET ?? ''),
};

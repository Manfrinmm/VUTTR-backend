const authConfig = {
  secret: process.env.APP_SECRET || "DefaultSecret",
  expiresIn: "1d",
};

export default authConfig;

module.exports = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    S3_CLIENT: {
      S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
      S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    },
    DB: {
      USER: process.env.PG_USER,
      HOST: process.env.PG_HOST,
      DATABASE: process.env.PG_DATABASE,
      PASSWORD: process.env.PG_PASSWORD,
      PORT: process.env.PG_PORT || 8080,
    }
  };
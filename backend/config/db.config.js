module.exports = {
    HOST: "localhost",
    USER: "agora",
    PASSWORD: "123",
    DB: "agorachain_users",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
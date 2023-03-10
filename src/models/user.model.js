module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      private: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
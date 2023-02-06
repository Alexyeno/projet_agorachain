module.exports = (sequelize, Sequelize) => {
    const Agora = sequelize.define("agora", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Agora;
  };
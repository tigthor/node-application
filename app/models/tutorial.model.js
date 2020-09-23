module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define('tutorial', {
        title: {
            type: Sequelize.STRING
        },
        decription: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial;
}
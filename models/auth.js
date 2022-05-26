const Sequelize = require('sequelize');

module.exports = class Auth extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                email:{
                    type: Sequelize.STRING(100)
                },
                password:{
                    type: Sequelize.STRING(100)
                }
		    }, 
            {
                sequelize,
                timestamps: false,
                modelName: 'Auth',
                tableName: 'auth',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db){
    }
};
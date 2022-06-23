const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                content:{
                    type: Sequelize.STRING(100)
                },
                writer:{
                    type: Sequelize.STRING(100)
                }
		    }, 
            {
                sequelize,
                timestamps: false,
                modelName: 'Post',
                tableName: 'posts',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db){
    }
};
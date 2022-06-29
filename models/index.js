const { Sequelize } = require("sequelize");
const Post = require("./post");
const Auth = require("./auth");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Post = Post; 
Post.init(sequelize);
Post.associate(db);

db.Auth = Auth; 
Auth.init(sequelize);
Auth.associate(db);

module.exports = db;
import { Sequelize } from "sequelize";
import Post from './models/postModel.js';
import User from './models/userModel.js';

const database = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const passwd = process.env.MYSQL_PASSWORD
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT

const sequelize = new Sequelize(database, username, passwd, {
    host: db_host,
    port: db_port,
    dialect: 'mysql',
});
// Initialize db models
const models = [User, Post];
models.forEach(model => {
    model.initModel(sequelize);
});
// Associations
const { User: user, Post: post } = sequelize.models;
user.hasMany(post, {foreignKey: 'userId'});
post.belongsTo(user, {foreignKey: 'userId'});

const syncDb = async () => {
    try {
        await sequelize.sync();
        console.log('MODELS: ', sequelize.models);
        console.log('DB synced.');
    } catch (error) {
        console.error(`DB sync error: `, error);
    }
}

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connected to the db: ${sequelize.getDatabaseName()}`);
    } catch (error) {
        console.error('Unable to connect to db', error);
        process.exit(1);
    }
}

export default sequelize;
export { connectDb, syncDb };
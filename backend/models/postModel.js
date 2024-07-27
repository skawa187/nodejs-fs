import { Sequelize, DataTypes, Model } from 'sequelize';
import {sequelize} from '../db.js';

class Post extends Model {}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Post',
    },
);

export default Post;
import { DataTypes, Model } from 'sequelize';

class Post extends Model {

    static initModel (sequelize) {
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
        )
    };
}

export default Post;
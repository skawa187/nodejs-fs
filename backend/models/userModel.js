import { DataTypes, Model } from 'sequelize';

class User extends Model {

    static initModel(sequelize) {
        User.init(
            {
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull:false,
                },
                fullname: {
                    type: DataTypes.STRING,
                },
                age: {
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                modelName: 'User',
            },
        );
    }
}

export default User;
import { DataTypes, Model } from "sequelize";

class GoogleUser extends Model {

    static initModel(sequelize) {
        GoogleUser.init(
            {
                googleId: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                displayName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'Google User',
                },
                email: {
                    type: DataTypes.STRING,
                    defaultValue: 'default@mail.com',
                },
                photo: {
                    type: DataTypes.STRING,
                },
                refreshToken: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },
                provider: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'GoogleUser',
            },
        );
    }
}

export default GoogleUser;
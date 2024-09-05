import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../lib/sequelize';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    money: number;
}

// Interfejs dla atrybutów opcjonalnych przy tworzeniu użytkownika
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'money'> {}

// Definicja modelu User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
    public country!: string;
    public city!: string;
    public address!: string;
    public money!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        money: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1000,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
    public id?: number;
    public email!: string;
    public password!: string;
    public user_type!: number;
    public is_active!: boolean;
}

User.init({
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    user_type: { type: DataTypes.INTEGER, allowNull:false, defaultValue:1 },
    is_active: {type: DataTypes.BOOLEAN, defaultValue:false}
}, {
    sequelize,
    modelName: 'User'
})

export default User;
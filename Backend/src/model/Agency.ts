import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

class Agency extends Model {
    public id?: number;
    public first_name!: string;
    public last_name!: string;
}

Agency.init({
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    phone:{type:DataTypes.STRING, allowNull:false},
    gender:{type:DataTypes.INTEGER, allowNull:false},
    profile_photo:{type:DataTypes.STRING, allowNull:false, unique:true}
}, {
    sequelize,
    modelName:'Agency'
});

User.hasOne(Agency, {onDelete:'CASCADE', onUpdate:'CASCADE'});
Agency.belongsTo(User);

export default Agency;
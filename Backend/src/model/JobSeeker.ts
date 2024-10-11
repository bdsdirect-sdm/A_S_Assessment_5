import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import Agency from "./Agency";

class JobSeeker extends Model {
    public id?: number;
    public first_name!: string;
    public last_name!: string;
    public resume!: string;
}

JobSeeker.init({
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    phone:{type:DataTypes.STRING, allowNull:false, unique:true},
    gender:{type:DataTypes.INTEGER, allowNull:false},
    profile_photo:{type:DataTypes.STRING, allowNull:false, unique:true},
    resume: {type:DataTypes.STRING, allowNull:false, unique:true}
}, {
    sequelize,
    modelName:'JobSeeker'
})

User.hasOne(JobSeeker, {onDelete:'CASCADE', onUpdate:'CASCADE'});
JobSeeker.belongsTo(User);

Agency.hasOne(JobSeeker, {onDelete:'CASCADE', onUpdate:'CASCADE'});
JobSeeker.belongsTo(Agency);

export default JobSeeker;
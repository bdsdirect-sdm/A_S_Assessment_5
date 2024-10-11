import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import User from "./User";
import { Hooks } from "sequelize/types/hooks";

class Hobby extends Model {
    public id?: number;
    public reading!: boolean
    public writting!: boolean
    public fitness!: boolean
    public shopping!: boolean
    public guitar!: boolean
}

Hobby.init({
    reading: {type:DataTypes.BOOLEAN, defaultValue:false},
    writting: {type:DataTypes.BOOLEAN, defaultValue:false},
    fitness: {type:DataTypes.BOOLEAN, defaultValue:false},
    shoping: {type:DataTypes.BOOLEAN, defaultValue:false},
    guitar: {type:DataTypes.BOOLEAN, defaultValue:false}
}, {
    sequelize,
    modelName: 'Hobby'
})

User.hasOne(Hobby, {onDelete:'CASCADE', onUpdate:'CASCADE'});
Hobby.belongsTo(User);



export default Hobby;
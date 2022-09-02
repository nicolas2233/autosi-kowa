import { sequelize } from "../../db";
import {DataTypes} from 'sequelize'
import { Vendors } from "../vendors/models";
export const Group = sequelize.define('group',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING,
    },
    lider:{
        type: DataTypes.STRING,
    }
})

Group.hasMany(Vendors)

//***********generando una instancia de un ojeto */
// const jane = User.build({ name: "Jane" });
// console.log(jane instanceof User); // true
// console.log(jane.name); // "Jane"

//*************************** */
// await jane.save();
// console.log('Jane was saved to the database!');

// const jane = await User.create({ name: "Jane" });
// // Jane exists in the database now!
// console.log(jane instanceof User); // true
// console.log(jane.name); // "Jane"

//********guardar ejemplo 1 */
// const jane = await User.create({ name: "Jane" });

// jane.set({
//   name: "Ada",
//   favoriteColor: "blue"
// });
// // As above, the database still has "Jane" and "green"
// await jane.save();

//*********ejemplo 2 */
// const jane = await User.create({ name: "Jane" });
// jane.favoriteColor = "blue"
// await jane.update({ name: "Ada" })
// // The database now has "Ada" for name, but still has the default "green" for favorite color
// await jane.save()
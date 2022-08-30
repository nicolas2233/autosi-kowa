"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const db_1 = require("../../db");
const sequelize_1 = require("sequelize");
const models_1 = require("../vendors/models");
exports.Group = db_1.sequelize.define('group', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    lider: {
        type: sequelize_1.DataTypes.STRING,
    }
});
exports.Group.hasMany(models_1.Vendors);
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

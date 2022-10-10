import { sequelize } from "../../../db";
import {DataTypes} from 'sequelize'
import { Personales } from "../personales/models";

export const Cliente = sequelize.define('cliente',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido:{
        type: DataTypes.STRING,
    },
    telefono:{
        type: DataTypes.STRING,
    },
})

Cliente.hasOne(Personales,{
    foreignKey:'cliente_Id',
    sourceKey:'id',
})

Cliente.belongsTo(Personales,{
    foreignKey: 'personales_Id',
    targetKey:'id'
})



// cbu:0150515301000133268408
// nombre: cecilia teresa Ñañez
// banco:icbc

// cbu:0150549801000105008353
// nombre:alvaro facundo miño


// cbu: 0150804601000125617038
// nombre:blanca del valle Ñañez
// banco:icbc

// cbu:4150999718002678470027
// alias:yamile.cimio.ars
// nombre: yamile cimino viñales
// banco: reba

// CBU: 4150999718005528820025
// Alias: MELENA.PROA.SANTA

// cbu: 0150817601000112993639
// nombre: iñaki






// https://mds-mds-api-gateway-dev.apps.k3s-dev.intranet.local

// like 1





// o en su defecto pueden usar mds-dev.api-gateway.intranet.local

// like 1

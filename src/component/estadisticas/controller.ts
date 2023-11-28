import { Request, Response } from 'express'
import { Event } from '../events/models';
import { Carga } from '../clientes/precarga/models'
import { Contrato } from '../contrato/model'
import { Op} from 'sequelize';
import { Vendors } from '../vendors/models';
import { Pago } from '../cobranza/model';
const Sequelize = require('sequelize');
interface ObjetoFinal {
  anio: string;
  mes: string;
  total: number;
  dias: string[];
  contratos: number[];
}

export async function getCargas(req: Request, res: Response) {
  try {
    const gerente=req.headers["user-id"]
    console.log("eventos",gerente)
    const a = await Vendors.findByPk(Number(gerente))
    if(Number(a?.getDataValue("category"))===3||Number(a?.getDataValue("category"))===4){
        const vens = await Vendors.findAll({where:{
          gerente:gerente?.toString()
        }})
       const id=vens.map(item=>(item.getDataValue("id")))
       const { rows } = await entrada(id,1,0)
       const events = rows.map((row) => {
         const { createdAt } = row.toJSON();
         const month = createdAt.getMonth() + 1;
         const date = `${createdAt.getDate()}-${month}-${createdAt.getFullYear()}`;
         return date;
       });
       const obj2 = agruparValores({ date: events });
   return res.status(200).json({ data: obj2 });
    }else{
    const { id } = req.body;
    const { rows } = await entrada(id,1,0)
    const events = rows.map((row) => {
      const { createdAt } = row.toJSON();
      const month = createdAt.getMonth() + 1;
      const date = `${createdAt.getDate()}-${month}-${createdAt.getFullYear()}`;
      return date;
    });

    const obj2 = agruparValores({ date: events });
    return res.status(200).json({ data: obj2 });
  }
  } catch (error) {
    console.log("EROR", error)
  }
}


export async function getContratos(req: Request, res: Response) {
  try {
    const gerente=req.headers["user-id"]
    const a = await Vendors.findByPk(Number(gerente))
    if(Number(a?.getDataValue("category"))===3||Number(a?.getDataValue("category"))===4){
        const vens = await Vendors.findAll({where:{
          gerente:gerente?.toString()
        }})
       const id=vens.map(item=>(item.getDataValue("id")))
       const { rows } = await entrada(id,3,0)
       const events = rows.map((row) => {
         const { createdAt } = row.toJSON();
         const month = createdAt.getMonth() + 1;
         const date = `${createdAt.getDate()}-${month}-${createdAt.getFullYear()}`;
         return date;
       });
       const obj2 = agruparValores({ date: events });
   return res.status(200).json({ data: obj2 });
    }else{
    const { id } = req.body;
    const { rows } = await entrada(id,3,0)
    const events = rows.map((row) => {
      const { createdAt } = row.toJSON();
      const month = createdAt.getMonth() + 1;
      const date = `${createdAt.getDate()}-${month}-${createdAt.getFullYear()}`;
      return date;
    });
    const obj2 = agruparValores({ date: events });
   return res.status(200).json({ data: obj2 });
  }
  } catch (error) {
    console.log("ERROR", error)
  }
}

export async function getEventos(req: Request, res: Response) {
  try {
    const gerente=req.headers["user-id"]
    const a = await Vendors.findByPk(Number(gerente))
    if(Number(a?.getDataValue("category"))===3||Number(a?.getDataValue("category"))===4){
        const vens = await Vendors.findAll({where:{
          gerente:gerente?.toString()
        }})
       const id=vens.map(item=>(item.getDataValue("id")))
       const { rows } = await entrada(id,2,gerente)
       const events = rows.map((row) => {
         const { createdAt } = row.toJSON();
         const month = createdAt.getMonth() + 1;
         const date = `${createdAt.getDate()}-${month}-${createdAt.getFullYear()}`;
         return date;
       });
       const obj2 = agruparValores({ date: events });
   return res.status(200).json({ data: obj2 });
    }else{
       const { id } = req.body;
    const { rows } = await entrada(id,2,gerente)
    const events = rows.map((row) => {
      const { createdAt } = row.toJSON();
      const month = createdAt.getMonth() + 1;
      const date = `${createdAt.getDate()}-${month}-${createdAt.getFullYear()}`;
      return date;
    });

    const obj2 = agruparValores({ date: events });
  return  res.status(200).json({ data: obj2 });
    }
   
  } catch (error) {
    console.log("EROR", error)
  }
}

function agruparValores(objeto: { date: any[] }): ObjetoFinal[] {
  const result: { [year: string]: { [month: string]: { [day: string]: number } } } = {};

  objeto.date.forEach((date) => {
    const [day, month, year] = date.split('-');
    if (!result[year]) result[year] = {};
    if (!result[year][month]) result[year][month] = {};
    result[year][month][day] = (result[year][month][day] || 0) + 1;
  });

  return createChartData(result);
}

// function createChartData(data: { [year: string]: { [month: string]: { [day: string]: number } } }): ObjetoFinal[] {
//   const objetoFinal: ObjetoFinal[] = [];
//   let maxMonth = 0;
  
//   // Encontrar el mes más alto existente
//   for (const anio in data) {
//     for (const mes in data[anio]) {
//       const mesNum = parseInt(mes);
//       if (mesNum > maxMonth) {
//         maxMonth = mesNum;
//       }
//     }
//   }
  
//   // Recorrer solo hasta el mes más alto existente
//   for (const anio in data) {
//     for (let mesNum = 1; mesNum <= maxMonth; mesNum++) {
//       const mes = mesNum.toString();
//       const valoresMes = data[anio][mes] || {};
//       const totalMes = Object.values(valoresMes).reduce((acc, curr) => acc + curr, 0);
//       const diasMes = Object.keys(valoresMes);
//       const contratosMes = Object.values(valoresMes);
//       objetoFinal.push({ anio, mes, total: totalMes, dias: diasMes, contratos: contratosMes });
//     }
//   }
//   return objetoFinal;
// }


function createChartData(data: { [year: string]: { [month: string]: { [day: string]: number } } }): ObjetoFinal[] {
  const objetoFinal: ObjetoFinal[] = [];

  for (const anio in data) {
      let maxMonthForYear = 0;

      // Encontrar el mes más alto existente para el año en curso
      for (const mes in data[anio]) {
          const mesNum = parseInt(mes);
          if (mesNum > maxMonthForYear) {
              maxMonthForYear = mesNum;
          }
      }
    
      // Recorrer solo hasta el mes más alto registrado en el año en curso
      for (let mesNum = 1; mesNum <= maxMonthForYear; mesNum++) {
          const mes = mesNum.toString() // Asegurarse de que siempre tenga dos dígitos
          const valoresMes = data[anio][mes] || {};
          const totalMes = Object.values(valoresMes).reduce((acc, curr) => acc + curr, 0);
          const diasMes = Object.keys(valoresMes);
          const contratosMes = Object.values(valoresMes);
          objetoFinal.push({ anio, mes, total: totalMes, dias: diasMes, contratos: contratosMes });
      }
  }

  return objetoFinal;
}





async function entrada(data: any, tipo: number,gerente:any) {
  let whereClause: any = {};

  if (data) {
    if (Array.isArray(data)) {
      if(tipo==2){
        data.push(gerente)
      const a = data.map(item=>(item.toString()))
      whereClause = { tipo: 'entrevista',
      [Op.and]: [
        { vendedor: { [Op.in]: a } }
        // Otras condiciones aquí...
      ] };
      }else{
        const a = data.map(item=>(item.toString()))
      whereClause = { vendedor: { [Op.in]: a } };
      }
    } else {
      if(tipo===2){
        whereClause = { vendedor: data.toString(),tipo: 'entrevista' };
      }else{
        whereClause = { vendedor: data.toString() };
      }

    }
  }
  if (!data && tipo==2) {
    whereClause = { tipo: 'entrevista' };
  }


  switch (tipo) {
    case 1:
      return await Carga.findAndCountAll({ where: whereClause });
    case 2:
      return await Event.findAndCountAll({ where:whereClause});
    case 3:
      whereClause.adeudado = "0";
      return await Contrato.findAndCountAll({ where: whereClause });
    default:
      throw new Error('Tipo de búsqueda inválido');
  }
}
  export async function getContratosVendors(req: Request, res: Response) {
    try {
        const {id}= req.body
        if(id!==null){
        const events = await Contrato.findAll({
            where: {
                vendedor: id?.toString()
            }
        })
      }
    } catch (error) {
        return res.sendStatus(500).json({ message: error })
    }
}




// export async function getContratosFiltrados(req: Request, res: Response) {
//   try {
//       const gerente = req.headers["user-id"];
//       console.log(">>>>>>>>>>>>>><<<",gerente)
//       const events = await Contrato.findAll({
//         where: {
//             vendedor: gerente?.toString()
//         }
//     })
//     const events2 = await Pago.findAll({
//       where: {
//         vendedor: gerente?.toString()
//     }
//     })
// const data=[]
// const data2=[]
// for (let i = 0; i < events2.length; i++) {
//   const element ={
//     pagos: events2[i].dataValues.dia
//   } 
//   data2.push(element)
// }
// for (let i = 0; i < events.length; i++) {
//   const element = {
//     dia:events[i].dataValues.dia,
//     metodopago:events[i].dataValues.metodopago,
//     adeudado:events[i].dataValues.adeudado,
//   };
//   data.push(element)
// }
// // console.log(organizarDatos(data))
// // console.log(organizarDatos(data2))
// // console.log(data2)
// const resultadoTransformado = data
// return res.status(200).json(organizarDatos(data,data2))

//   } catch (error) {
//       console.log("ERROR", error);
//       return res.status(500).send("Error interno del servidor");
//   }
// }


export async function getContratosFiltrados(req: Request, res: Response) {
  try {
    const vendedor = req.headers["user-id"];
    const a = await Vendors.findByPk(Number(vendedor))
    console.log(a?.dataValues.category)
    if(a?.dataValues.category=="1"||a?.dataValues.category=="2"){
       const contratos = await Contrato.findAll({
      where: {
        vendedor: vendedor?.toString()
      }
    });

    const pagos = await Pago.findAll({
      where: {
        vendedor: vendedor?.toString()
      }
    });

const contratosTransformados = contratos.map((evento) => ({
      dia: evento.dataValues.dia,
      metodopago: evento.dataValues.metodopago,
      adeudado: evento.dataValues.adeudado,
    }));

    const pagosTransformados = pagos.map((evento) => ({
      pagos: evento.dataValues.dia,
    }));
      const resultadoTransformado = organizarDatos(contratosTransformados, pagosTransformados);
       return res.status(200).json(resultadoTransformado);
    }
    if(a?.dataValues.category=="5"){
      const contratos = await Contrato.findAll();

   const pagos = await Pago.findAll();

const contratosTransformados = contratos.map((evento) => ({
     dia: evento.dataValues.dia,
     metodopago: evento.dataValues.metodopago,
     adeudado: evento.dataValues.adeudado,
   }));

   const pagosTransformados = pagos.map((evento) => ({
     pagos: evento.dataValues.dia,
   }));
     const resultadoTransformado = organizarDatos(contratosTransformados, pagosTransformados);
      return res.status(200).json(resultadoTransformado);
   }
   if(a?.dataValues.category=="4"){
    const b = await Vendors.findAll({
        where:{
        gerente:vendedor?.toString()
        }
      })
    
      const ven = b.map((evento) => (
        evento.dataValues.id?.toString()
      ));
const contratos = await Contrato.findAll({
  where: {
    vendedor: {[Op.in]: ven}
  }
   });
   
 const pagos = await Pago.findAll(
  {
    where: {
      vendedor: {[Op.in]: ven}
    }
     }
 );

const contratosTransformados = contratos.map((evento) => ({
   dia: evento.dataValues.dia,
   metodopago: evento.dataValues.metodopago,
   adeudado: evento.dataValues.adeudado,
 }));

 const pagosTransformados = pagos.map((evento) => ({
   pagos: evento.dataValues.dia,
 }));
   const resultadoTransformado = organizarDatos(contratosTransformados, pagosTransformados);
    return res.status(200).json(resultadoTransformado);
 }
    

   

   
  } catch (error) {
    console.error('Error en getContratosFiltrados:', error);
    return res.status(500).send('Error interno del servidor');
  }
}


const organizarDatos = (datos:any, datosPagos:any) => {
  const resultado:any = {};

  datos.forEach((elemento:any) => {
    const fecha = new Date(elemento.dia);
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Sumamos 1 ya que los meses en JavaScript van de 0 a 11

    // Inicializamos las propiedades si no existen
    resultado[año] = resultado[año] || {};
    resultado[año].mes = resultado[año].mes || {};
    resultado[año].mes[mes] = resultado[año].mes[mes] || {
      cargados: 0,
      pagados: 0,
      cancelados: 0
    };

    // Incrementamos los contadores según el método de pago y el adeudo
    resultado[año].mes[mes].cargados += 1;

    if (elemento.adeudado === '0') {
      resultado[año].mes[mes].cancelados += 1;
    }
    // Puedes agregar la lógica para contabilizar los pagados aquí
  });

  // Agregar la lógica para contabilizar los pagos
  datosPagos.forEach((pago:any) => {
    const fechaPago = new Date(pago.pagos);
    const añoPago = fechaPago.getFullYear();
    const mesPago = fechaPago.getMonth() + 1;

    // Verificar si la propiedad ya está inicializada
    resultado[añoPago] = resultado[añoPago] || {};
    resultado[añoPago].mes = resultado[añoPago].mes || {};
    resultado[añoPago].mes[mesPago] = resultado[añoPago].mes[mesPago] || {
      cargados: 0,
      pagados: 0,
      cancelados: 0
    };

    // Incrementar el contador de pagados
    resultado[añoPago].mes[mesPago].pagados += 1;
  });

  // Rellenar los meses que faltan con valores predeterminados
  for (const año in resultado) {
    for (let mes = 1; mes <= 12; mes++) {
      resultado[año].mes[mes] = resultado[año].mes[mes] || {
        cargados: 0,
        pagados: 0,
        cancelados: 0
      };
    }
  }

  return resultado;
};
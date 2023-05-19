import { Request, Response } from 'express'
import { Event } from '../events/models';
import { Carga } from '../clientes/precarga/models'
import { Contrato } from '../contrato/model'
import { Op } from 'sequelize';
import { Vendors } from '../vendors/models';

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
       const { rows } = await entrada(id,1)
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
    const { rows } = await entrada(id,1)
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
    console.log("eventos",gerente)
    const a = await Vendors.findByPk(Number(gerente))
    if(Number(a?.getDataValue("category"))===3||Number(a?.getDataValue("category"))===4){
        const vens = await Vendors.findAll({where:{
          gerente:gerente?.toString()
        }})
       const id=vens.map(item=>(item.getDataValue("id")))
       const { rows } = await entrada(id,3)
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
    const { rows } = await entrada(id,3)
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
    console.log("eventos",gerente)
    const a = await Vendors.findByPk(Number(gerente))
    if(Number(a?.getDataValue("category"))===3||Number(a?.getDataValue("category"))===4){
        const vens = await Vendors.findAll({where:{
          gerente:gerente?.toString()
        }})
       const id=vens.map(item=>(item.getDataValue("id")))
       const { rows } = await entrada(id,2)
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
    const { rows } = await entrada(id,2)
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

function createChartData(data: { [year: string]: { [month: string]: { [day: string]: number } } }): ObjetoFinal[] {
  const objetoFinal: ObjetoFinal[] = [];
  let maxMonth = 0;
  
  // Encontrar el mes más alto existente
  for (const anio in data) {
    for (const mes in data[anio]) {
      const mesNum = parseInt(mes);
      if (mesNum > maxMonth) {
        maxMonth = mesNum;
      }
    }
  }
  
  // Recorrer solo hasta el mes más alto existente
  for (const anio in data) {
    for (let mesNum = 1; mesNum <= maxMonth; mesNum++) {
      const mes = mesNum.toString();
      const valoresMes = data[anio][mes] || {};
      const totalMes = Object.values(valoresMes).reduce((acc, curr) => acc + curr, 0);
      const diasMes = Object.keys(valoresMes);
      const contratosMes = Object.values(valoresMes);
      objetoFinal.push({ anio, mes, total: totalMes, dias: diasMes, contratos: contratosMes });
    }
  }
  return objetoFinal;
}

async function entrada(data: any, tipo: number) {
  let whereClause: any = {};

  if (data) {
    if (Array.isArray(data)) {
      const a = data.map(item=>(item.toString()))
      whereClause = { vendedor: { [Op.in]: a } };
    } else {
      whereClause = { vendedor: data.toString() };
    }
  }

  switch (tipo) {
    case 1:
      return await Carga.findAndCountAll({ where: whereClause });
    case 2:
      return await Event.findAndCountAll({ where: whereClause });
    case 3:
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


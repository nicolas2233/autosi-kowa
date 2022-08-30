"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventTime = exports.createEvent = exports.getEvent = void 0;
const models_1 = require("../clientes/cliente/models");
const models_2 = require("./models");
function getEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendedor = req.headers["user-id"];
            const events = yield models_2.Event.findAll({
                include: [{ model: models_1.Cliente }],
                where: {
                    vendedor: vendedor
                }
            });
            res.status(200).send(events);
        }
        catch (error) {
            return res.sendStatus(500).json({ message: error });
        }
    });
}
exports.getEvent = getEvent;
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { dia, hora, tipo, nota, clienteId } = req.body;
            const vendedor = req.headers["user-id"];
            const date = new Date;
            const day = date.getDate();
            const mes = date.getMonth();
            const año = date.getFullYear();
            const fecha = day + "-" + mes + "-" + año;
            console.log(day);
            const cliente = yield models_1.Cliente.findByPk(clienteId);
            if (cliente !== null) {
                const newEvent = yield models_2.Event.create({
                    dia,
                    hora,
                    tipo,
                    nota,
                    cliente_Id: clienteId,
                    vendedor: vendedor
                });
                const eventid = newEvent.getDataValue("id");
                yield cliente.setDataValue("event_Id", eventid);
                cliente.save();
                return res.json({ message: "evento creado satisfactoriamente", newEvent: newEvent });
            }
            return res.json({ message: "el usuario no se encontro" });
        }
        catch (error) {
            return res.sendStatus(500).json({ message: error });
        }
    });
}
exports.createEvent = createEvent;
function getEventTime(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date;
            const day = date.getDate();
            const mes = date.getMonth() + 1;
            const año = date.getFullYear();
            const fecha = day + "-" + mes + "-" + año;
            const vendedor = req.headers["user-id"];
            const events = yield models_2.Event.findAll({
                include: [{ model: models_1.Cliente }],
                where: {
                    vendedor: vendedor,
                    dia: fecha
                }
            });
            res.status(200).send(events);
        }
        catch (error) {
            return res.sendStatus(500).json({ message: error });
        }
    });
}
exports.getEventTime = getEventTime;
// export async function  deleteProject(req: Request, res: Response) {
//     try {
//           const { id } = req.params
//     await Project.destroy({
//         where:{
//             id
//         }
//       })
//         res.send("projecto eliminad correctamente")
//     } catch (error) {
//        return res.status(500).json({message: error})
//     }
// }
// export async function  updateProject(req: Request, res: Response) {
//     try {
//         const { id } = req.params
//         const {name, priority, description} = req.body
//         const project = await Project.findByPk(id)
//         console.log("este es un apdate",project)
//     } catch (error) {
//        return res.status(500).json({message: error})
//     }
// }

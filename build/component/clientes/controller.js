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
exports.deleteClient = exports.createClient = exports.getClient = void 0;
const models_1 = require("./precarga/models");
const models_2 = require("./personales/models");
const models_3 = require("./laboral/models");
const models_4 = require("./cliente/models");
const models_5 = require("./crediticios/models");
const models_6 = require("./movilidad/models");
function getClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendedor = req.headers["user-id"];
            const cliente = yield models_1.Carga.findAll({
                where: {
                    vendedor: vendedor
                },
                // attributes:["createdAt"     
                // ],
                include: [{
                        model: models_4.Cliente,
                        include: [{
                                model: models_2.Personales,
                                include: [{
                                        model: models_5.Crediticio,
                                        include: [{ model: models_6.Movilidad }]
                                    },
                                    { model: models_3.Laboral }]
                            }]
                    }]
            });
            res.status(200).send(cliente);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.getClient = getClient;
function createClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { conoci, horario, telefono } = req.body;
            const { nombre, apellido } = req.body;
            const vendedor = req.headers["user-id"];
            /**se crea la entidad crediticio */
            const newCrediticio = yield models_5.Crediticio.create();
            const crediticioId = newCrediticio.getDataValue("id");
            /**se crea la entidad laboral */
            const newLaboral = yield models_3.Laboral.create();
            const laboralId = newLaboral.getDataValue("id");
            /**se crea la entidad personal */
            const newPersonales = yield models_2.Personales.create({ laboral_Id: laboralId, crediticio_Id: crediticioId });
            const personalesId = newPersonales.getDataValue("id");
            /**se crea la entidad personal */
            const newCliente = yield models_4.Cliente.create({ nombre, telefono, personales_Id: personalesId });
            const clienteId = newCliente.getDataValue("id");
            /**se crea la entidad personal */
            const newCarga = yield models_1.Carga.create({ conoci, horario, telefono, vendedor: vendedor, cliente_Id: clienteId });
            const cargaId = newCarga.getDataValue("id");
            newCliente.setDataValue("carga_Id", cargaId);
            newCliente.save();
            newPersonales.setDataValue("cliente_Id", clienteId);
            newPersonales.save();
            newCrediticio.setDataValue("personales_Id", personalesId);
            newCrediticio.save();
            newLaboral.setDataValue("personales_Id", personalesId);
            newLaboral.save();
            res.json({ newCarga });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.createClient = createClient;
function deleteClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const client = yield models_4.Cliente.findByPk(id);
            console.log("cliente", client);
            client === null || client === void 0 ? void 0 : client.destroy();
            res.json(client);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.deleteClient = deleteClient;
// export async function  updateClient(req: Request, res: Response) {
//     try {
//         const { id } = req.params
//         const { name,
//            lastname,
//            tel,
//            email
//         } = req.body
//         const client = await Client.findByPk(id)
//         client?.setDataValue("name", name)
//         client?.setDataValue("lastname", lastname)
//         client?.setDataValue("tel", tel)
//         client?.setDataValue("email", email)
//         client?.save()
//         res.json(client)
//     } catch (error) {
//         return res.status(500).json({ message: error })
//     }
// }

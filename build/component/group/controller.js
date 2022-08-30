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
exports.addVendors = exports.updateGroup = exports.deleteGroup = exports.createGroup = exports.getGroup = void 0;
const models_1 = require("../vendors/models");
const models_2 = require("./models");
function getGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const group = yield models_2.Group.findAll({
                include: [{ model: models_1.Vendors }]
            });
            res.status(200).send(group);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.getGroup = getGroup;
function createGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const vendedor = req.headers["user-id"];
            const log = yield models_1.Vendors.findByPk(vendedor === null || vendedor === void 0 ? void 0 : vendedor.toString());
            if ((log === null || log === void 0 ? void 0 : log.getDataValue("groupId")) === null) {
                const newGroup = yield models_2.Group.create({
                    name,
                    lider: vendedor
                });
                log.setDataValue("groupId", newGroup.getDataValue("id"));
                log.save();
                res.json({ message: "grupo creado satisfactoriamente", newGroup });
            }
            else {
                res.json({ message: "ya eres lider de un grupo" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.createGroup = createGroup;
function deleteGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.deleteGroup = deleteGroup;
function updateGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.updateGroup = updateGroup;
function addVendors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idVendor, idGroup } = req.body;
            const vendors = yield models_1.Vendors.findByPk(idVendor);
            if (vendors !== null) {
                yield (vendors === null || vendors === void 0 ? void 0 : vendors.update({ groupId: idGroup }));
                return res.json({ message: "vendedores agregados al gupo" });
            }
            else {
                return res.json({ message: "el vendedor no se encontro" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.addVendors = addVendors;

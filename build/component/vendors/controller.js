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
exports.getVendorGroup = exports.updateVendors = exports.deleteVendors = exports.getOneVendors = exports.getVendors = void 0;
const models_1 = require("./models");
function getVendors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield models_1.Vendors.findAll();
            return res.status(200).send(vendors);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.getVendors = getVendors;
function getOneVendors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, lastname, dni, email, phone } = req.body;
            const arr = [name, lastname, dni, email, phone];
            const txt = ["name", "lastname", "dni", "email", "phone"];
            var num = 0;
            var val;
            var value;
            var vendor;
            while (arr[num] === null || arr[num] === undefined) {
                num++;
            }
            val = txt[num];
            value = arr[num];
            switch (val) {
                case "name":
                    vendor = yield models_1.Vendors.findOne({
                        where: { name: value }
                    });
                    break;
                case "lastname":
                    vendor = yield models_1.Vendors.findOne({
                        where: { lastname: value }
                    });
                    break;
                case "dni":
                    vendor = yield models_1.Vendors.findOne({
                        where: { dni: value }
                    });
                    break;
                case "email":
                    vendor = yield models_1.Vendors.findOne({
                        where: { email: value }
                    });
                    break;
                case "phone":
                    vendor = yield models_1.Vendors.findOne({
                        where: { phone: value }
                    });
                    break;
                default:
                    break;
            }
            console.log(vendor);
            if (vendor === null || vendor === undefined) {
                return res.status(200).send({ message: "no se pudo encontrar ningun vendedor" });
            }
            return res.status(200).send(vendor);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.getOneVendors = getOneVendors;
function deleteVendors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const vendor = yield models_1.Vendors.findByPk(id);
            vendor === null || vendor === void 0 ? void 0 : vendor.destroy();
            res.json(vendor);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.deleteVendors = deleteVendors;
function updateVendors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { email, password, phone, category } = req.body;
            const vendedor = yield models_1.Vendors.findByPk(id);
            vendedor === null || vendedor === void 0 ? void 0 : vendedor.setDataValue("email", email);
            vendedor === null || vendedor === void 0 ? void 0 : vendedor.setDataValue("password", password);
            vendedor === null || vendedor === void 0 ? void 0 : vendedor.setDataValue("phone", phone);
            vendedor === null || vendedor === void 0 ? void 0 : vendedor.setDataValue("category", category);
            vendedor === null || vendedor === void 0 ? void 0 : vendedor.save();
            res.json(vendedor);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.updateVendors = updateVendors;
function getVendorGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupid } = req.body;
            const vendedor = yield models_1.Vendors.findAll({
                where: {
                    groupId: groupid
                }
            });
            res.json(vendedor);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.getVendorGroup = getVendorGroup;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const models_1 = require("../vendors/models");
const models_2 = require("../roles/models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const newVendors = yield models_1.Vendors.findOne({ where: { email: email } });
        if (newVendors === null) {
            return res.status(400).json({ Message: "user not found" });
        }
        const realPass = newVendors.getDataValue("password");
        const matchPass = yield passcompared(password, realPass);
        if (!matchPass) {
            return res.status(401).json({ Message: "invalid password", Token: "null" });
        }
        const token = jsonwebtoken_1.default.sign({ id: newVendors.getDataValue("id") }, config_1.default.SECRET, {
            expiresIn: 86400
        });
        res.status(200).json({ vendors: newVendors, token: token });
    });
}
exports.signin = signin;
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, lastname, password, email, dni, phone, category } = req.body;
        let catrol = category;
        const rol = yield models_2.Role.findOne({ where: { name: catrol } });
        if (rol === null) {
            console.log('Not found!');
            catrol = null;
        }
        else {
            console.log(rol instanceof models_2.Role);
            catrol = rol.getDataValue("id");
        }
        const mail = yield models_1.Vendors.findOne({
            where: {
                email: email
            }
        });
        if (mail !== null) {
            return res.json({ message: "el vendedor ya existe" });
        }
        const newVendors = yield models_1.Vendors.create({
            name,
            lastname,
            password: yield passencrypting(password),
            email,
            dni,
            phone,
            category: catrol
        });
        // const token = jwt.sign({ id: newVendors.getDataValue("id") }, secret.SECRET, {
        //   expiresIn: "3h"
        // })
        return res.json({ vendors: newVendors });
    });
}
exports.signup = signup;
const passencrypting = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(pass, salt);
});
const passcompared = (pass, entrypass) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(pass, entrypass);
});

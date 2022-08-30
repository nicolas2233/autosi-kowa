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
exports.isJr = exports.isSr = exports.isSupervisor = exports.isGerente = exports.isAdmin = exports.verifyToken = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../component/vendors/models");
const models_2 = require("../component/roles/models");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["x-access-token"];
        const token2 = token === null || token === void 0 ? void 0 : token.toString();
        if (!token2) {
            return res.status(403).json({ Message: "no token provider" });
        }
        const decode = yield jsonwebtoken_1.default.verify(token2, config_1.default.SECRET);
        const decodeS = JSON.stringify(decode.valueOf());
        const decodeObject = JSON.parse(decodeS);
        req.headers["user-id"] = decodeObject.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" });
    }
});
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.headers["user-id"]) === null || _a === void 0 ? void 0 : _a.toString();
        const user = yield models_1.Vendors.findByPk(id);
        const role = yield models_2.Role.findByPk(user === null || user === void 0 ? void 0 : user.getDataValue("category"));
        if ((role === null || role === void 0 ? void 0 : role.getDataValue("name")) == "admin") {
            next();
        }
        else {
            return res.status(403).json({ messenger: "Require admin role" });
        }
    }
    catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" });
    }
});
exports.isAdmin = isAdmin;
const isGerente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req.headers["user-id"]) === null || _b === void 0 ? void 0 : _b.toString();
        const user = yield models_1.Vendors.findByPk(id);
        const role = yield models_2.Role.findByPk(user === null || user === void 0 ? void 0 : user.getDataValue("category"));
        if ((role === null || role === void 0 ? void 0 : role.getDataValue("name")) === "gerente") {
            next();
        }
        else {
            return res.status(403).json({ messenger: "Require gerente role" });
        }
    }
    catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" });
    }
});
exports.isGerente = isGerente;
const isSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = (_c = req.headers["user-id"]) === null || _c === void 0 ? void 0 : _c.toString();
        const user = yield models_1.Vendors.findByPk(id);
        const role = yield models_2.Role.findByPk(user === null || user === void 0 ? void 0 : user.getDataValue("category"));
        if ((role === null || role === void 0 ? void 0 : role.getDataValue("name")) == "supervisor") {
            next();
        }
        else {
            return res.status(403).json({ messenger: "Require supervisor role" });
        }
    }
    catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" });
    }
});
exports.isSupervisor = isSupervisor;
const isSr = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const id = (_d = req.headers["user-id"]) === null || _d === void 0 ? void 0 : _d.toString();
        const user = yield models_1.Vendors.findByPk(id);
        const role = yield models_2.Role.findByPk(user === null || user === void 0 ? void 0 : user.getDataValue("category"));
        if ((role === null || role === void 0 ? void 0 : role.getDataValue("name")) == "sr") {
            next();
        }
        else {
            return res.status(403).json({ messenger: "Require sr role" });
        }
    }
    catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" });
    }
});
exports.isSr = isSr;
const isJr = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const id = (_e = req.headers["user-id"]) === null || _e === void 0 ? void 0 : _e.toString();
        const user = yield models_1.Vendors.findByPk(id);
        const role = yield models_2.Role.findByPk(user === null || user === void 0 ? void 0 : user.getDataValue("category"));
        if ((role === null || role === void 0 ? void 0 : role.getDataValue("name")) == "jr") {
            next();
        }
        else {
            return res.status(403).json({ messenger: "Require jr role" });
        }
    }
    catch (error) {
        return res.status(401).json({ messenger: "Unauthorized" });
    }
});
exports.isJr = isJr;

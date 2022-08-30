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
exports.prueba = exports.updateProject = exports.deleteProject = exports.createProject = exports.getProject = void 0;
const models_1 = require("./models");
function getProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield models_1.Project.findAll();
        res.status(200).send(projects);
    });
}
exports.getProject = getProject;
function createProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, priority, description } = req.body;
            const newproject = yield models_1.Project.create({
                name,
                description,
                priority
            });
            res.json(newproject);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.createProject = createProject;
function deleteProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const newproject = yield models_1.Project.findByPk(id);
            newproject === null || newproject === void 0 ? void 0 : newproject.destroy();
            res.send(newproject);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.deleteProject = deleteProject;
function updateProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, priority, description } = req.body;
            const newproject = yield models_1.Project.findByPk(id);
            newproject === null || newproject === void 0 ? void 0 : newproject.setDataValue("name", name);
            newproject === null || newproject === void 0 ? void 0 : newproject.setDataValue("priority", priority);
            newproject === null || newproject === void 0 ? void 0 : newproject.setDataValue("description", description);
            newproject === null || newproject === void 0 ? void 0 : newproject.save();
            console.log(newproject);
            res.json(newproject);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.updateProject = updateProject;
function prueba(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const newproject = yield models_1.Project.findAll({
                where: {
                    priority: 3
                }
            });
            console.log(newproject.length);
            res.json(newproject);
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    });
}
exports.prueba = prueba;

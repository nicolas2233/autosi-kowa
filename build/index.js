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
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
require("../src/component/projects/models");
const controller_1 = require("./component/roles/controller");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.sequelize.sync({ force: false, alter: false });
            app_1.default.listen(app_1.default.get('port'));
            (0, controller_1.createRole)();
            console.log('server listening on port: 4000');
            console.log('el servidor quedo enlazado');
        }
        catch (error) {
            console.log('no se pudo conectar con el servidor', error);
        }
    });
}
main();

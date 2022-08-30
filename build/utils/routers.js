"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../component/projects/router"));
const router_2 = __importDefault(require("../component/vendors/router"));
const router_3 = __importDefault(require("../component/group/router"));
const router_4 = __importDefault(require("../component/auth/router"));
const router_5 = __importDefault(require("../component/clientes/router"));
const router_6 = __importDefault(require("../component/events/router"));
const rutas = [
    router_1.default,
    router_2.default,
    router_3.default,
    router_4.default,
    router_5.default,
    router_6.default
];
exports.default = rutas;

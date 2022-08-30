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
exports.createRole = void 0;
const models_1 = require("./models");
const createRole = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield models_1.Role.findAll();
        if (count.length !== 0)
            return;
        const values = yield Promise.all([
            yield models_1.Role.create({ name: "jr" }),
            yield models_1.Role.create({ name: "sr" }),
            yield models_1.Role.create({ name: "supervisor" }),
            yield models_1.Role.create({ name: "gerente" }),
            yield models_1.Role.create({ name: "admin" })
        ]);
        console.log(values);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createRole = createRole;

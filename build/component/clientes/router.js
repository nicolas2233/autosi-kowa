"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifysingup_1 = require("../../middlewares/verifysingup");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/client', [verifysingup_1.verifyToken], controller_1.getClient),
    router.post('/client', [verifysingup_1.verifyToken], controller_1.createClient);
//   router.put('client/:id',updateClient),
router.delete('/client/:id', controller_1.deleteClient);
//   router.get('/client/:id')
exports.default = router;

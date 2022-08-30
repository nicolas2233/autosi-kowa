"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifysingup_1 = require("../../middlewares/verifysingup");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/group', controller_1.getGroup);
router.post('/group', [verifysingup_1.verifyToken, verifysingup_1.isGerente], controller_1.createGroup),
    router.put('group/:id', controller_1.updateGroup),
    router.delete('/group/:id', controller_1.deleteGroup),
    router.put('/group/addVendors', controller_1.addVendors);
exports.default = router;

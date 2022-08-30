"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
//[verifyToken,isAdmin]
router.get('/vendors', controller_1.getVendors),
    router.put('/vendors/:id', controller_1.updateVendors),
    router.delete('/vendors/:id', controller_1.deleteVendors),
    router.get('/vendors/findFor', controller_1.getOneVendors),
    router.get('/vendors/group', controller_1.getVendorGroup);
exports.default = router;

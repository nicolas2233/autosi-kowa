"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifysingup_1 = require("../../middlewares/verifysingup");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/events', [verifysingup_1.verifyToken], controller_1.getEvent),
    router.post('/events', [verifysingup_1.verifyToken], controller_1.createEvent),
    router.get('/events/eventTime', [verifysingup_1.verifyToken], controller_1.getEventTime);
//   router.delete('/projects/:id', deleteProject),
//   router.get('/projects/:id')
exports.default = router;

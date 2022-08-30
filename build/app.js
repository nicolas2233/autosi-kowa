"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routers_1 = __importDefault(require("../src/utils/routers"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_swagger_1 = require("./config-swagger");
// const { useTreblle } = require("treblle");
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 4000);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// useTreblle(app, {
//     apiKey: "fsvUcgT2BNcCTr3dSTAfbf6c7RpTVuyE",
//     projectId: "yuyOW4QgeWLTcUwk"
// });
const specs = (0, swagger_jsdoc_1.default)(config_swagger_1.options);
app.get("/", function (req, res) {
    res.json({ mensagge: "hola mundo" });
});
app.use(routers_1.default);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
exports.default = app;

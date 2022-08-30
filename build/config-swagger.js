"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "prueba api",
            version: "1.0.0",
            description: "es una api de prueba",
        },
        servers: [{
                url: "http://localhost:4000"
            }]
    },
    apis: ['./src/component/projects/router.ts',
        './src/component/vendors/vendors.doc.ts',
        './src/component/clientes/clientes.doc.ts',
        './src/component/group/group.doc.ts',
        './src/component/auth/auth.doc.ts'
    ]
};

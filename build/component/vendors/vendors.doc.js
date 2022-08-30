"use strict";
/**
 * @swagger
 * components:
 *  schemas:
 *    vendors:
 *      type: object
 *      properties:
 *          id:
 *             type: string
 *             description: el ID se autogenera.
 *          name:
 *            type: string
 *            description: nombre del vendedor
 *          lastname:
 *            type: string
 *            description: apellido del vendedor
 *          email:
 *            type: string
 *            description: email del vendedor con el cual servira para loguearse y comunicacion
 *          password:
 *            type: string
 *            description: password del vendedor sera con 8 caracteres como minimo y conbinado con letras y numeros u al menos contendra una letra en mayuscula
 *          dni:
 *            type: integer
 *            description: dni del vendedor este sera unico
 *          category:
 *             type: string
 *             description: la categoria del vendedor
 *      required:
 *          - name
 *          - lastname
 *          - email
 *          - password
 *          - dni
 *          - category
 *      example:
 *        id: Xak78hamma
 *        name: maxi
 *        lastname: disilvestro
 *        email: maxidisilvestro@gmail.com
 *        password: maxidisilvestro
 *        dni: 35377840
 *        phone: 2342572322
 *        category: jr
 *
 */
/**
 * @swagger
 * tags:
 *   name: vendors
 *   description: rutas de los vendedores
 */
/**
 * @swagger
 * /vendors:
 *  get:
 *    summary: Get a vendors list
 *    tags: [vendors]
 *    responses:
 *      200:
 *        description: trae la lista de todos los vendedores
 *        content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/vendors'
 *
 */
/**
 * @swagger
 * /vendors:
 *  post:
 *    summary: crear un nuevo vendedor
 *    tags: [vendors]
 *    requestBody:
 *        required: true
 *        content:
 *             application/json:
 *              schema:
 *                  $ref: '#/components/schemas/vendors'
 *    responses:
 *      200:
 *        description: vendedor creado exitosamente
 *        content:
 *             application/json:
 *              schema:
 *                  $ref: '#/components/schemas/vendors'
 *      500:
 *        description: error en el servidor
 */
/**
 * @swagger
 * /vendors/{id}:
 *  get:
 *    summary: Get a one vendors
 *    tags: [vendors]
 *    parameters:
 *           - name: id
 *    responses:
 *      200:
 *        description: trae vendedor por id
 *        content:
 *           application/json:
 *              schema:
 *                type: object
 *                items:
 *                  $ref: '#/components/schemas/vendors'
 *
 */ 

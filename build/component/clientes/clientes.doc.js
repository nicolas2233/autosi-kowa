"use strict";
/**
 * @swagger
 * components:
 *  schemas:
 *    prueba:
 *      type: object
 *      properties:
 *          id:
 *             type: string
 *             description: el ID se autogenera.
 *          conoci:
 *            type: string
 *            description: este el nombre del proyeto
 *          horario:
 *            type: string
 *            description: valor de la prioridad
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    clientes:
 *      type: object
 *      properties:
 *          id:
 *             type: string
 *             description: el ID se autogenera.
 *          conoci:
 *            type: string
 *            description: este el nombre del proyeto
 *          horario:
 *            type: string
 *            description: valor de la prioridad
 *          userid:
 *             type: integer
 *             description:
 */
/**
 * @swagger
 * tags:
 *   name: clientes
 *   description: clientes endpiont
 */
/**
 * @swagger
 * /clientes:
 *   get:
 *    summary: Add a new pet
 *    requestbody:
 *    tags: [clientes]
 *    responses:
 *      200:
 *        description: trae la lista de los clientes
 *        content:
 *           application/json:
 *              schema:
 *                type: object
 *                items:
 *                  $ref: '#/components/schemas/clientes'
 *
 *
 */ 

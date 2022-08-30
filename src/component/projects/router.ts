import { Router } from "express";
import {getProject, createProject, deleteProject, updateProject, prueba} from './controller'
const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    projects:
 *      type: object
 *      properties:
 *          id:
 *             type: string
 *             description: el ID se autogenera.
 *          name:
 *            type: string
 *            description: este el nombre del proyeto
 *          priority:
 *            type: integer
 *            description: valor de la prioridad
 *          description:
 *            type: string
 *            description: este es la descripcion del proyecto
 *      required: 
 *          - name
 *          - priority
 *          - description
 *      example:
 *        id: Xak78hamma
 *        name: first projects
 *        priority: 2
 *        description: primera descripcion
 * 
 */
 /**
  * @swagger
  * tags:
  *   name: projects
  *   description: project endpiont
  */

/**
 * @swagger
 * /projects:
 *  get:
 *    summary: Get a projects list
 *    tags: [projects]
 *    responses:
 *      200:
 *        description: the list the projects
 *        content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/projects'
 * 
 */
  router.get('/projects',getProject),
/**
 * @swagger
 * /projects:
 *  post:
 *    summary: crear un nuevo proyecto
 *    tags: [projects]
 *    requestBody:
 *        required: true
 *        content: 
 *             application/json:
 *              schema:
 *                  $ref: '#/components/schemas/projects'
 *    responses:
 *      200: 
 *        description: proyecto creado
 *        content:
 *             application/json:
 *              schema:
 *                  $ref: '#/components/schemas/projects'
 *      500:
 *        description: error en el servidor
 */
  router.post('/projects', createProject),
  
  router.put('/projects/:id',updateProject),
  
  router.delete('/projects/:id', deleteProject),
  
  router.get('/projects/search',prueba)



export default router
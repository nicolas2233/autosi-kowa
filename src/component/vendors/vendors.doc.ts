 /**
  * @swagger
  * tags:
  *   name: vendors
  *   description: rutas de los vendedores
  */

 /**
  * @swagger
  *  components:
  *    securitySchemes:
  *         bearerAuth:
  *             type: http
  *             scheme: bearer
  *             bearerFormat: JWT
  *         basicAuth:
  *             type: http
  *             scheme: basic 
  */





/**
 * @swagger
 * /vendors/update:
 *  put:
 *    summary: update de vendedor
 *    tags: [vendors]
 *    responses:
 *      200:
 *        description: datos actualizados
 *    requestBody:
 *        content:
 *           application/json:
 *              schema:
 *                 id:
 *                  type: string
 *                  description: 
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                   description: telefono nuevo, si no se modifica va null
 *                 password:
 *                    type: string
 *                    description: password nuevo, si no se modifica va null
 *              example:
 *                id: 1
 *                email: maxinuevo@gmail.com 
 *                phone: 011234567
 *                password: dimaniga1
 *                  
 *                      
 * 
 */

/**
 * @swagger
 * /vendors:
 *   get:
 *    summary: lista de todos los vendedores
 *    requestbody:
 *    tags: [vendors]
 *    responses:
 *      200:
 *        description: trae la lista de todos los vendedores
 *        content:
 *           application/json:
 *              schema:
 *                type: object
 *                items:
 *                  $ref: '#/components/schemas/vendors'
 *     
 * 
 */

 /**
 * @swagger
 * /vendors/group:
 *   get:
 *    summary: lista de todos los vendedores de un grupo
 *    requestbody:
 *    tags: [vendors]
 *    responses:
 *      200:
 *        description:
 *        content:
 *           application/json:
 *              schema:
 *                 id:
 *                  type: string 
 *              example:
 *                 id: 1
 * 
 *     
 * 
 */

  /**
 * @swagger
 * /vendors/category:
 *   get:
 *    summary: lista de todos los vendedores segun categoria
 *    requestbody:
 *    tags: [vendors]
 *    responses:
 *      200:
 *        description:
 *        content:
 *           application/json:
 *              schema:
 *                 id:
 *                  type: string 
 *              example:
 *                 id: 1
 * 
 *     
 * 
 */




  
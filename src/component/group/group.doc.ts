/**
 * @swagger
 * components:
 *  schemas:
 *    group:
 *      type: object
 *      properties:
 *          id:
 *             type: string
 *             description: el ID se autogenera.
 *          name:
 *            type: string
 *            description: nombre del equipo
 *          lider:
 *            type: string
 *            description: id del lider del equipo
 *          miembro1:
 *            type: string
 *            description: id del integrante del equipo
 *          miembro2:
 *            type: string
 *            description: id del integrante del equipo
 *          miembro3:
 *            type: string
 *            description: id del integrante del equipo
 *          miembro4:
 *            type: string
 *            description: id del integrante del equipo
 *          miembro5:
 *            type: string
 *            description: id del integrante del equipo
 *      required: 
 *          - name
 *          - lider
 *      example:
 *        id: Xak78hamma
 *        name: los mejores
 *        lider: HaJ78hrkla
 *        miembro1: HaJ78hrkla
 *        miembro2: HaJ78hrkla
 *        miembro3: HaJ78hrkla
 *        miembro4: HaJ78hrkla
 *        miembro5: HaJ78hrkla
 * 
 */
 /**
  * @swagger
  * tags:
  *   name: group
  *   description: rutas de grupos
  */

/**
 * @swagger
 * /group:
 *  get:
 *    summary: trae la lista de grupos
 *    tags: [group]
 *    responses:
 *      200:
 *        description: trae la lista de los grupos 
 *        content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/group'
 * 
 */
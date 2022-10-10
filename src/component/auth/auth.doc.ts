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
 *            type: string
 *            description: dni del vendedor este sera unico
 *          phone:
 *            type: string
 *            description: telefono del vendedor
 *          category:
 *             type: string
 *             description: la categoria del vendedor
 *      required: 
 *          - name
 *          - lastname
 *          - email
 *          - password
 *          - dni
 *          - phone
 *          - category
 *      example:
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
 * components:
 *  schemas:
 *    vendor:
 *      type: object
 *      properties:
 *          password:
 *            type: string
 *            description: password del vendedor sera con 8 caracteres como minimo y conbinado con letras y numeros u al menos contendra una letra en mayuscula
 *          email:
 *            type: string
 *            description: email del vendedor con el cual servira para loguearse y comunicacion
 *          require:
 *          - password
 *          - email
 *      example:
 *        email: maxidisilvestro@gmail.com
 *        password: maxidisilvestro
 */

 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: ruta para crear vendedor y logeaerse
  */


/**
 * @swagger
 * /auth/signup:
 *  post:
 *    summary: crear un nuevo vendedor
 *    tags: [Auth]
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
 *      403:
 *        description: usuario ya existe
 */

 /**
 * @swagger
 * /auth/signin:
 *  post:
 *    summary: login
 *    tags: [Auth]
 *    requestBody:
 *        required: true
 *        content: 
 *             application/json:
 *              schema:
 *                  $ref: '#/components/schemas/vendor'
 *    responses:
 *      200:
 *        description: trae los datos del vendedor logeado
 *        content:
 *             application/json:
 *              schema:
 *                  $ref: '#/components/schemas/vendors'
 *      500:
 *        description: error en el servidor
 *      403:
 *        description: credenciales invalidas
 *      401:
 *        description: usuario no existe
 */
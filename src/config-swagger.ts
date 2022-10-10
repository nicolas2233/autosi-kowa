export const options ={
  definition:{
      openapi:"3.0.0",
      info:{
          title:"AUTO-SI Docs",
          version:"1.0.0",
          description:"",
      },
      security:{
         password:{
          read:"",
          write:"",
        }      
      },
      securitySchemes:{
        password:{
           type: "oauth2",
        flows:{
          password:{
            tokenUrl: 'http://example.com/oauth/token',
            scopes:{
               write: "allows modifying resources",
              read: "allows reading resources"
            }          
          }
        }
          
        } 
      },
      
      components: {
        },
      servers:[{
         url:"http://localhost:4000" || process.env.PORT
           
      }]
  },
  apis:[
        './src/component/vendors/vendors.doc.ts',
        './src/component/clientes/clientes.doc.ts',
        './src/component/group/group.doc.ts',
        './src/component/auth/auth.doc.ts'
      ]
    }







//  {
//   "openapi" : "3.0.0",
//   "servers" : [ {
//     "description" : "SwaggerHub API Auto Mocking",
//     "url" : "http://localhost:4000" 
//       } ],
//   "info" : {
//     "version" : "1.0.0",
//     "title" : "Sample Password Flow OAuth2 Project",
//     "description" : "This is an example of using OAuth2 Password Flow in a specification to describe security to your API."
//   },
//   "security" : [ {
//     "password" : [ "read", "write" ]
//   } ],
//   "paths" : {
//     "/example" : {
//       "get" : {
//         "summary" : "Server example operation",
//         "description" : "This is an example operation to show how security is applied to the call.",
//         "responses" : {
//           "200" : {
//             "description" : "OK"
//           }
//         }
//       }
//     },
//     "/ping" : {
//       "get" : {
//         "summary" : "Server heartbeat operation",
//         "description" : "This operation shows how to override the global security defined above, as we want to open it up for all users.",
//         "security" : [ ],
//         "responses" : {
//           "200" : {
//             "description" : "OK"
//           }
//         }
//       }
//     }
//   },
//   "components" : {
//     "schemas" : { },
//     "securitySchemes" : {
//       "password" : {
//         "type" : "oauth2",
//         "flows" : {
//           "password" : {
//             "tokenUrl" : "http://example.com/oauth/token",
//             "scopes" : {
//               "write" : "allows modifying resources",
//               "read" : "allows reading resources"
//             }
//           }
//         }
//       }
//     }
//   }
// }
  


export default{
    SECRET: "vendors/autosi"
}

// {
// definition:{
//     openapi:"3.0.0",
//     info:{
//         title:"AUTO-SI Docs",
//         version:"1.0.0",
//         description:"",
//     },
//     security:{
//        password:{
//         read:"",
//         write:"",
//       }      
//     },
//     securitySchemes:{
//       password:{
//          type: "oauth2",
//       flows:{
//         password:{
//           tokenUrl: 'http://example.com/oauth/token',
//           scopes:{
//              write: "allows modifying resources",
//             read: "allows reading resources"
//           }          
//         }
//       }
        
//       } 
//     },
    
//     components: {
//       },
//     servers:[{
//        url:"http://localhost:4000" || process.env.PORT
         
//     }]
// },
// apis:[
//       './src/component/vendors/vendors.doc.ts',
//       './src/component/clientes/clientes.doc.ts',
//       './src/component/group/group.doc.ts',
//       './src/component/auth/auth.doc.ts'
//     ]
//   }
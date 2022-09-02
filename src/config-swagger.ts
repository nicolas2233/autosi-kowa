export const options={
definition:{
    openapi:"3.0.0",
    info:{
        title:"prueba api",
        version:"1.0.0",
        description:"es una api de prueba",
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

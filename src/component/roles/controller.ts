import  {Role}  from './models'

export const createRole = async()=>{
    try {
        const count = await Role.findAll()
        if(count.length!==0)return
        const values= await Promise.all([
         await  Role.create({name:"jr"}),
         await Role.create({name:"sr"}),
         await Role.create({name:"supervisor"}),
         await Role.create({name:"gerente"}),
         await Role.create({name:"admin"})    
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}


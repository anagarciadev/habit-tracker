import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

const app = Fastify();
const prisma = new PrismaClient()

/** 
 * Metodo HTTP: Get, Put, Patch, Delete
*/

app.register(cors)

app.get('/hello', async () => {
    const habits = await prisma.habit.findMany({
       
    })

    return habits
})

app.listen({
    port: 3333,
}).then(( ) => {
    
    console.log ('HTTPS Server Running')

})
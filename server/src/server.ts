import Fastify from 'fastify'

const app = Fastify();

/** 
 * Metodo HTTP: Get, Put, Patch, Delete
*/

app.get('/', () => {
    return 'Hello World'
})

app.listen({
    port: 3333,
})
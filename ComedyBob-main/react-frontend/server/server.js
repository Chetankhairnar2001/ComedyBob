// require libraries
const fastify = require('fastify')();
const fastifyStatic = require('@fastify/static');
const fastifyCompress = require('@fastify/compress');
const path = require('path');
// store PORT env variable with default to 3000
const PORT = process.env.PORT || 3000;

// add compression plugin
fastify.register(fastifyCompress);
// add static file serving plugin
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'dist'),
    prefix: '/'
});

// create catch-all route that serves index.html of app
fastify.get('*', (req, reply) => {
    return reply.sendFile('index.html');
});

// start server
fastify.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
    if (err) throw err;
    console.log('Server listening at port ' + PORT);
});
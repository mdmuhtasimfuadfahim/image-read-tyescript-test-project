import fastify from 'fastify';
import * as dotenv from 'dotenv';
import carController from './controllers/car.controller';
import { connectDB } from './db/db_config';
import multer = require('fastify-multer');

dotenv.config();
connectDB();

let PORT: any = process.env.PORT || 3001;
const app = fastify();
app.register(multer.contentParser);

app.post('/car-parking/add-entry', async (request, reply) => {
    await new carController(request, reply).addEntry();
});

app.get('/car-parking/get-entry/:carNumber', async (request, reply) => {
    await new carController(request, reply).getSingleEntry();
});

app.get('/car-parking/get-entries', async (request, reply) => {
    await new carController(request, reply).getEntries();
});

app.post('/car-parking/car-entry', async (request, reply) => {
    await new carController(request, reply).carEntry();
});

app.post('/car-parking/car-out', async (request, reply) => {
    await new carController(request, reply).carOut();
});

app.listen({ port: PORT}, (err, address) => {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`)
});
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv = __importStar(require("dotenv"));
const car_controller_1 = __importDefault(require("./controllers/car.controller"));
const db_config_1 = require("./db/db_config");
const multer = require("fastify-multer");
dotenv.config();
(0, db_config_1.connectDB)();
let PORT = process.env.PORT || 3001;
const app = (0, fastify_1.default)();
app.register(multer.contentParser);
app.post('/car-parking/add-entry', async (request, reply) => {
    await new car_controller_1.default(request, reply).addEntry();
});
app.get('/car-parking/get-entry/:carNumber', async (request, reply) => {
    await new car_controller_1.default(request, reply).getSingleEntry();
});
app.get('/car-parking/get-entries', async (request, reply) => {
    await new car_controller_1.default(request, reply).getEntries();
});
app.post('/car-parking/car-entry', async (request, reply) => {
    await new car_controller_1.default(request, reply).carEntry();
});
app.post('/car-parking/car-out', async (request, reply) => {
    await new car_controller_1.default(request, reply).carOut();
});
app.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});

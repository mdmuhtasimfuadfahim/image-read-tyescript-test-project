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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const T = require('tesseract.js');
fs.readdirSync(__dirname);
const Car = require('../models/car.model');
const uploadService = require('../services/upload.service');
const __dirPath = path.join(__dirname, '../uploads/');
class carController {
    constructor(request, reply) {
        // to add or register a car to the system
        this.addEntry = async () => {
            try {
                if (!this.request.body.firstName || !this.request.body.lastName || !this.request.body.contact || !this.request.body.carNumber)
                    return this.reply.send('Required data error');
                if (typeof this.request.body.firstName !== 'string' || typeof this.request.body.lastName !== 'string' || typeof this.request.body.contact !== 'string' || typeof this.request.body.carNumber !== 'string')
                    return this.reply.send('Required data are not valid');
                const car = await Car.create(this.request.body);
                this.reply.send(car);
            }
            catch (error) {
                this.reply.send(error.message);
            }
        };
        // to fetch single car information
        this.getSingleEntry = async () => {
            try {
                const car = await Car.findOne({ carNumber: this.request.params.carNumber });
                if (!car)
                    return this.reply.send('Car not found');
                this.reply.send(car);
            }
            catch (error) {
                this.reply.send(error.message);
            }
        };
        // to fetch all cars information
        this.getEntries = async () => {
            try {
                const cars = await Car.find();
                if (!cars)
                    return this.reply.send('No cars found');
                this.reply.send(cars);
            }
            catch (error) {
                this.reply.send(error.message);
            }
        };
        // car entry time add
        this.carEntry = async () => {
            try {
                uploadService.upload(this.request, this.reply, async (err) => {
                    if (err)
                        console.log(err);
                    else {
                        const fileOutput = await T.recognize(`./uploads/${this.request.file.filename}`, 'eng');
                        const car = await Car.findOne({ carNumber: fileOutput.data.text.split("\n") });
                        if (!car)
                            return this.reply.send('Car not found');
                        const lastEntry = new Date();
                        const carUpdate = await Car.findByIdAndUpdate({ _id: car._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") }, { lastEntry: lastEntry });
                        return carUpdate;
                    }
                });
                this.reply.send("Car Entry Added");
            }
            catch (error) {
                this.reply.send(error.message);
            }
        };
        // to update the time when a car outs
        this.carOut = async () => {
            try {
                uploadService.upload(this.request, this.reply, async (err) => {
                    if (err)
                        console.log(err);
                    else {
                        const fileOutput = await T.recognize(`./uploads/${this.request.file.filename}`, 'eng');
                        const car = await Car.findOne({ carNumber: fileOutput.data.text.split("\n") });
                        if (!car)
                            return this.reply.send('Car not found');
                        const lastOut = new Date();
                        const carUpdate = await Car.findByIdAndUpdate({ _id: car._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") }, { lastOut: lastOut });
                        return carUpdate;
                    }
                });
                this.reply.send("Car Out Added");
            }
            catch (error) {
                this.reply.send(error.message);
            }
        };
        this.request = request;
        this.reply = reply;
    }
    ;
}
exports.default = carController;

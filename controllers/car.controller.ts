import * as fs from 'fs';
import * as path from 'path';
const T = require('tesseract.js');
fs.readdirSync(__dirname);

const Car = require('../models/car.model');
const uploadService = require('../services/upload.service');
const __dirPath = path.join(__dirname, '../uploads/')


export default class carController {
    request: any;
    reply: any;

    constructor(request: any, reply: any) {
        this.request = request;
        this.reply = reply;
    };

    // to add or register a car to the system
    addEntry = async () => {
        try {
            if(!this.request.body.firstName || !this.request.body.lastName || !this.request.body.contact || !this.request.body.carNumber) return this.reply.send('Required data error');
            if(typeof this.request.body.firstName !== 'string'|| typeof this.request.body.lastName !== 'string' || typeof this.request.body.contact !== 'string' || typeof this.request.body.carNumber !== 'string') return this.reply.send('Required data are not valid');

            const car = await Car.create(this.request.body);
            this.reply.send(car);
        } catch (error: any) {
            this.reply.send(error.message);
        }
    };

    // to fetch single car information
    getSingleEntry = async () => {
        try {
            const car = await Car.findOne({carNumber: this.request.params.carNumber});
            if(!car) return this.reply.send('Car not found');
            this.reply.send(car);
        } catch (error: any) {
            this.reply.send(error.message);
        }
    };

    // to fetch all cars information
    getEntries = async () => {
        try {
            const cars = await Car.find();
            if(!cars) return this.reply.send('No cars found');
            this.reply.send(cars);
        } catch (error: any) {
            this.reply.send(error.message);
        }
    };

    // car entry time add
    carEntry = async () => {
        try {
            uploadService.upload(this.request, this.reply, async (err: any) => {
                if (err) console.log(err);
                else {
                    const fileOutput: any = await T.recognize(`./uploads/${this.request.file.filename}`, 'eng')
                    const car: any = await Car.findOne({ carNumber: fileOutput.data.text.split("\n") });
                    if(!car) return this.reply.send('Car not found');
                    const lastEntry: any = new Date();
                    const carUpdate: any = await Car.findByIdAndUpdate({ _id: car._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") }, { lastEntry: lastEntry });
                    return carUpdate;
                }
            });
            this.reply.send("Car Entry Added");
        } catch (error: any) {
            this.reply.send(error.message);
        }
    };

    // to update the time when a car outs
    carOut = async () => {
        try {
            uploadService.upload(this.request, this.reply, async (err: any) => {
                if (err) console.log(err);
                else {
                    const fileOutput: any = await T.recognize(`./uploads/${this.request.file.filename}`, 'eng')
                    const car: any = await Car.findOne({ carNumber: fileOutput.data.text.split("\n") });
                    if(!car) return this.reply.send('Car not found');
                    const lastOut: any = new Date();
                    const carUpdate: any = await Car.findByIdAndUpdate({ _id: car._id.toString().replace(/ObjectId\("(.*)"\)/, "$1") }, { lastOut: lastOut });
                    return carUpdate;
                }
            });
            this.reply.send("Car Out Added");
        } catch (error: any) {
            this.reply.send(error.message);
        }
    };

}
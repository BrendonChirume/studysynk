import mongoose from "mongoose";
import Grid from "gridfs-stream";
import {GridFsStorage} from 'multer-gridfs-storage';
import multer from "multer";
import * as crypto from "crypto";
import path from "path";

let gfs;

mongoose.connect(process.env.MONGODB_URI as string).then((res) => {
    gfs = Grid(res, mongoose.mongo);
    gfs.collection('papers');
});


const storage = new GridFsStorage({
    url: process.env.MONGODB_URI as string,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (error, buffer) => {
                if (error) {
                    return reject(error)
                }
                const filename = buffer.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'papers'
                }
                resolve(fileInfo)
            })
        })
    }
});

export const uploadFile = multer({storage});
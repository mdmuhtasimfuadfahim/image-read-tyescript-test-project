const multer = require('fastify-multer');
import * as path from 'path';

const storage = multer.diskStorage({
    destination: (request: any, file: any, cb: any) => cb(null, 'uploads/'),
    filename: (request: any, file: any, cb: any) => {
      const uniqueName = `tmp-${Date.now()}${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
});

export const upload = multer({ 
    storage,
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
}).single('file');
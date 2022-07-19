import path from 'path'
import multer from 'multer'
import { randomBytes } from 'crypto';
import { NextFunction, Request, Response } from 'express';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export const upload = {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {
            const fileHash = randomBytes(10).toString("hex");

            const filename = `${fileHash}-${file.originalname}`;

            callback(null, filename);
        }
    })
}
const uploadFile = multer(upload).single('avatar');

export default function validateFile(req: Request, res: Response, next: NextFunction) {
    uploadFile(req, res, (err) => {
        if (err) {
            console.log("err")
        } else {
            req.body = JSON.parse(req.body.user);

            next();
        }
    })

}
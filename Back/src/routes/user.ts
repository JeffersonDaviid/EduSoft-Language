import express from 'express';
import multer from 'multer';
import { createUserCtrl, loginUserCtrl, recoverPasswordCtrl, updateProfileCtrl } from '../controllers/user-ctrl';

const routerUser = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profile-pictures');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.split('.').pop();
        cb(null, `${uniqueSuffix}.${ext}`);
    }
});
const upload = multer({ storage });

routerUser.post('/create', createUserCtrl as express.RequestHandler);
routerUser.post('/login', loginUserCtrl as express.RequestHandler);
routerUser.post('/recover-password', recoverPasswordCtrl as express.RequestHandler);

routerUser.post('/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ filename: `profile-pictures/${req.file.filename}` });
});

routerUser.put('/update-profile', updateProfileCtrl as express.RequestHandler);

export { routerUser };
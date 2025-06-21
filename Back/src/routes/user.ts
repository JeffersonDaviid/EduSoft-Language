import express from 'express';
import multer from 'multer';
import {
	createUserCtrl,
	loginUserCtrl,
	recoverPasswordCtrl,
	updateProfileCtrl,
	addGameHistory,
	getUserProgress,
	getUserRanking,
} from '../controllers/user-ctrl';

const routerUser = express.Router();

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'public/profile-pictures');
	},
	filename: (_req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const ext = file.originalname.split('.').pop();
		cb(null, `${uniqueSuffix}.${ext}`);
	},
});
const upload = multer({ storage });

routerUser.post('/create', createUserCtrl as express.RequestHandler);
routerUser.post('/login', loginUserCtrl as express.RequestHandler);
routerUser.post('/recover-password', recoverPasswordCtrl as express.RequestHandler);

routerUser.post(
	'/upload-profile-picture',
	upload.single('profilePicture'),
	(req, res) => {
		if (!req.file) {
			res.status(400).json({ error: 'No file uploaded' });
			return;
		}
		res.json({ filename: `profile-pictures/${req.file.filename}` });
	}
);

routerUser.put('/update-profile', updateProfileCtrl as express.RequestHandler);

routerUser.post('/game-history', addGameHistory as express.RequestHandler);
routerUser.get('/progress', getUserProgress as express.RequestHandler);
routerUser.get('/ranking', getUserRanking as express.RequestHandler);

export { routerUser };

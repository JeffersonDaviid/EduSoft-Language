import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { routerUser } from './src/routes/user';

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello World desde bun 🧄!');
});

app.use('/user', routerUser);

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});

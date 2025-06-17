import type { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
const prisma = new PrismaClient();

const createUserCtrl = async (req: Request, res: Response) => {
	const { email, username, password, answerSecret } = req.body;

	if (!email || !username || !password || !answerSecret) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	await prisma.user
		.create({
			data: {
				email,
				username,
				password,
				answerSecret,
			},
		})
		.then(() => {
			console.log('User created successfully');
		})
		.catch((error) => {
			console.error('Error creating user:', error);
			return res.status(500).json({ error: 'Internal server error' });
		});

	res.status(201).json({ message: 'User created successfully' });
};

export { createUserCtrl };

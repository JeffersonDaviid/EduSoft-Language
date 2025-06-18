import type { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const createUserCtrl = async (req: Request, res: Response) => {
    const { email, username, password, answerSecret } = req.body;

    if (!email || !username || !password || !answerSecret) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        await prisma.user.create({
            data: {
                email,
                username,
                password,
                answerSecret,
            },
        });
        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUserCtrl = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.password !== password) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const recoverPasswordCtrl = async (req: Request, res: Response) => {
    const { email, answerSecret, newPassword } = req.body;

    if (!email || !answerSecret || !newPassword) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (user.answerSecret !== answerSecret) {
            res.status(401).json({ error: 'Secret answer is incorrect' });
            return;
        }
        await prisma.user.update({
            where: { email },
            data: { password: newPassword },
        });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error recovering password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { createUserCtrl, loginUserCtrl, recoverPasswordCtrl };
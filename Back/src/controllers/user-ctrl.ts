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
                profilePicture: 'default-profile-picture.jpg', 
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
				createdAt: user.createdAt,
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

const updateProfileCtrl = async (req: Request, res: Response) => {
    const { email, username, newPassword, profilePicture } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const data: any = { username };
        if (profilePicture) data.profilePicture = profilePicture;
        if (newPassword) data.password = newPassword;

        const updated = await prisma.user.update({
            where: { email },
            data,
        });

        res.json({ user: updated });
    } catch (err) {
        res.status(500).json({ error: 'Error updating profile' });
    }
};

const addGameHistory = async (req: Request, res: Response) => {
    const { userId, game, score } = req.body;
    try {
        const record = await prisma.gameHistory.create({
            data: { userId, game, score }
        });
        res.json(record);
    } catch (err) {
        res.status(500).json({ error: 'Error saving game history' });
    }
};

const getUserProgress = async (req: Request, res: Response) => {
    const { userId } = req.query;

    try {
        const history = await prisma.gameHistory.findMany({
            where: { userId: String(userId) },
            orderBy: { playedAt: 'desc' }
        });

        const gamesPlayed = history.length;
        const averageScore = gamesPlayed
            ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / gamesPlayed)
            : 0;

        res.json({ gamesPlayed, averageScore, history });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching progress' });
    }
};

const getUserRanking = async (req: Request, res: Response) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });

    try {
        // Suma total de score por usuario
        const users = await prisma.user.findMany({
            include: {
                gameHistory: true
            }
        });

        // Array de { userId, totalScore }
        const scores = users.map(u => ({
            userId: u.id,
            totalScore: u.gameHistory.reduce((acc, h) => acc + h.score, 0)
        }));

        // Ordena de mayor a menor score
        scores.sort((a, b) => b.totalScore - a.totalScore);

        // Busca el ranking (posición + 1)
        const ranking = scores.findIndex(u => u.userId === userId) + 1;

        res.json({ ranking });
    } catch (err) {
        res.status(500).json({ error: 'Error calculating ranking' });
    }
};

export { createUserCtrl, loginUserCtrl, recoverPasswordCtrl, updateProfileCtrl, addGameHistory, getUserProgress, getUserRanking };
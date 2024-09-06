import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import User from '../models/User';

const SECRET_KEY = process.env.JWT_SECRET || 'secretkey';

export async function authenticate(req: NextApiRequest, res: NextApiResponse): Promise<User | null> {
    const cookie = req.headers.cookie;

    if (!cookie) {
        res.status(401).json({ error: 'Brak ciasteczka uwierzytelnienia' });
        return null;
    }

    const { auth: token } = parse(cookie);

    if (!token) {
        res.status(401).json({ error: 'Brak tokenu uwierzytelnienia' });
        return null;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number };

        const user = await User.findByPk(decoded.id);

        if (!user) {
            res.status(401).json({ error: 'Użytkownik nie został znaleziony' });
            return null;
        }

        return user;
    } catch (error) {
        res.status(401).json({ error: 'Token jest nieprawidłowy lub wygasł' });
        return null;
    }
}

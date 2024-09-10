import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await authenticate(req, res);

    if (!user) {
        return;
    }

    try {
        const money:number = user.money;
        const username: string = user.username;
        res.status(200).json({ username,money });
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd podczas pobierania punktów użytkownika.' });
    }
}

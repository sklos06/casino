import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await authenticate(req, res);

    if (!user) {
        return;
    }

    try {

        const money = user.money;

        res.status(200).json({ money });
    } catch (error) {
        res.status(500).json({ error: 'Wystąpił błąd podczas pobierania punktów użytkownika.' });
    }
}

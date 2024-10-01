import {NextApiRequest, NextApiResponse} from 'next';
import {authenticate} from '../../middleware/auth';
import User from '../../models/User';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === 'GET') {
        const user = await authenticate(req, res);
        if (!user) {
            return;
        }
        try {
            const money: number = user.money;
            const username: string = user.username;
            res.status(200).json({username, money});
        } catch (error) {
            res.status(500).json({error: 'Wystąpił błąd podczas pobierania punktów użytkownika.'});
        }
    } else if (req.method === 'POST') {
        const { username, money } = req.body;

        try {

            const [updatedCount] = await User.update(
                { money },
                { where: { username } }
            );

            if (updatedCount === 0) {
                return res.status(404).json({ error: 'Nie znaleziono użytkownika do aktualizacji.' });
            } else {
                res.status(200).json({ success: true, message: 'Pieniądze zostały zaktualizowane.' });
            }
        } catch (error) {
            console.error('Błąd przy aktualizacji pieniędzy:', error);
            res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji pieniędzy.' });
        }
    }
}

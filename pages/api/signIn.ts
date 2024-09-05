import {NextApiRequest, NextApiResponse} from 'next';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {

            const user: User | null = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(401).json({ error: 'Nieprawidłowa nazwa użytkownika lub hasło.' });
            }


            if (user.password !== password) {
                return res.status(401).json({ error: 'Nieprawidłowa nazwa użytkownika lub hasło.' });
            }


            return res.status(200).json({ message: 'Logowanie zakończone sukcesem', redirectUrl: '../main' ,userId: user!.id });

        } catch (error) {
            console.error('Błąd podczas logowania:', error);
            return res.status(500).json({ error: 'Wystąpił błąd podczas logowania.' });
        }
    } else {
        res.status(405).json({ error: 'Metoda nie jest dozwolona' });
    }
}
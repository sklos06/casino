import {NextApiRequest, NextApiResponse} from 'next';
import User from '../../models/User';
import sequelize from "@/lib/sequelize";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // await sequelize.sync({ alter: true });

        console.log('Otrzymane dane:', req.body);
        const user = req.body;
        console.log(user);
        try {
            const newUser = await User.create(user);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Szczegóły błędu:', error);
            res.status(500).json({error: 'Błąd przy tworzeniu użytkownika', details: error});
        }

    }
    //Do przeniesienia do innego pliku ponzej
    else if (req.method === 'GET') {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Szczegóły błędu:', error);
            res.status(500).json({error: 'Błąd przy pobieraniu użytkowników', details: error});
        }
    } else if (req.method === 'DELETE') {
        try {
            await sequelize.query('DELETE FROM Users');
            await sequelize.query("DELETE FROM sqlite_sequence WHERE name = 'Users'");
            res.status(200).json({message: 'Baza danych została wyczyszczona.'});
        } catch (error) {
            res.status(500).json({error: 'Wystąpił problem podczas czyszczenia bazy danych.'});
        }
    }
    // az do tego momentu
    else {
        res.status(405).json({error: 'Metoda nie jest dozwolona'});
    }
}

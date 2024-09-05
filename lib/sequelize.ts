import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'db', 'database.sqlite'),
});

sequelize.sync().then(() => {
    console.log('Baza danych została zsynchronizowana');
}).catch(err => {
    console.error('Błąd podczas synchronizacji bazy danych:', err);
});

export default sequelize;


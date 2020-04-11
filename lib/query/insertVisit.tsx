import query from '../db';
import escape from 'sql-template-strings';
import { VisitCreation } from '../interfaces/visit.interface';

const insertVisit = async (visit: VisitCreation) => {
    return await query(escape`
        INSERT INTO visit (url, date, idUser)
        VALUES (${visit.url},${visit.date}, ${visit.idUser})`
    );
};

export default insertVisit;

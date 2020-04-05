import query from '../db';
import escape from 'sql-template-strings';
import { VisitCreation } from '../interfaces/visit.interface';

const insertVisit = async (visit: VisitCreation) => 
{
    return await query(escape`
        INSERT INTO visit (url, ip, date, userAgent, idVisitor)
        VALUES (${visit.url},${visit.ip},${visit.date}, ${visit.userAgent}, ${visit.idVisitor})`
    );
};

export default insertVisit;

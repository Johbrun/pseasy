import { VisitCreation, VisitUserCreation } from '../interfaces/visit.interface';
import crypto from 'crypto';
import { UserCreation } from '../interfaces/user.interface';
import insertUser from '../query/insertUser';
import insertVisit from '../query/insertVisit';


const saveNewVisitor = async (visitUser: VisitUserCreation) => 
{
    const visit: VisitCreation = {
        url: visitUser.url,
        idUser: crypto.createHash('md5').update(visitUser.ip + visitUser.userAgent).digest('hex').toString(),
        date: new Date()
    };

    const user: UserCreation = { id: visit.idUser, ip: visitUser.ip, userAgent: visitUser.userAgent };
    await insertUser(user);
    return await insertVisit(visit);
};

export default saveNewVisitor;
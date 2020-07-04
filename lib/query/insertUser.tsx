import query from '../db';
import escape from 'sql-template-strings';
import { UserCreation } from '../interfaces/user.interface';

const insertUser = async (user: UserCreation) => {
    return await query(escape`
        INSERT IGNORE INTO user (id, ip, userAgent)
        VALUES (${user.id}, ${user.ip}, ${user.userAgent})`);
};

export default insertUser;

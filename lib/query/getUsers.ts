import query from '../db';
import escape from 'sql-template-strings';
import { User } from '../interfaces/user.interface';

const getUsers = async () => 
{
    return await query(
        escape`SELECT id, ip, userAgent, name
      FROM user
      ORDER BY id`
    ).catch(e => console.error(e)) as User[];
};

export default getUsers;

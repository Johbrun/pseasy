import query from '../db';
import escape from 'sql-template-strings';
import { UsernameUpdate } from '../interfaces/user.interface';

const updateUserName = async (idUser : string, user: UsernameUpdate) => 
{
    return await query(escape`
        UPDATE user SET name = ${user.name}
        where (id = ${idUser})`
    );
};

export default updateUserName;

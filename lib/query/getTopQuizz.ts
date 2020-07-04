import query from '../db';
import escape from 'sql-template-strings';

const getTopQuizz = async () => {
    return await query(
        escape`SELECT s1.id, s1.reference, s1.title, s1.idCategory, s1.version, s1.updatedDate, s1.level 
        FROM sheet s1 
        LEFT JOIN sheet s2 
          ON (s1.reference = s2.reference AND s1.updatedDate < s2.updatedDate) 
        WHERE s2.id IS NULL`
    ).catch((e) => console.error(e));
};

export default getTopQuizz;

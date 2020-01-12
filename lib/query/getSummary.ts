import query from '../db';
import escape from 'sql-template-strings';

const getSummary = async () => 
{
    return await query(
        escape`SELECT id, reference, title, idCategory, version, updatedDate, level
      FROM sheet
      GROUP BY reference
      ORDER BY id`
    ).catch(e => console.error(e));
};

export default getSummary;

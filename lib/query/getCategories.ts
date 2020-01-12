import query from '../db';
import escape from 'sql-template-strings';

const getCategories = async () => 
{
    return await query(
        escape`SELECT id, number, name
      FROM category
      ORDER BY id`
    ).catch(e => console.error(e));
};

export default getCategories;

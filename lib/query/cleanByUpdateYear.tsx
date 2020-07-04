import query from '../db';
import escape from 'sql-template-strings';

const cleanByUpdateYear = async (year: string) => {
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    const res1 = await query(
        escape`DELETE FROM sheet WHERE updatedDate BETWEEN ${start} AND ${end}`
    );
    // const res2 = await query(escape`DELETE FROM category`);
    console.log(res1);
};

export default cleanByUpdateYear;

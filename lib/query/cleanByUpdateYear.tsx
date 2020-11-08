import query from '../db';
import escape from 'sql-template-strings';

const cleanByUpdateYear = async (year: string) => {
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

};

export default cleanByUpdateYear;

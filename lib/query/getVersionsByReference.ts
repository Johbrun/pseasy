import query from '../db';
import escape from 'sql-template-strings';

const getVersionsByReference = async (reference: string) => {
    console.debug(`getVersionsByReference() called ; reference : ${reference}`);

    return await query(
        escape`SELECT id, idCategory, version, updatedDate
      FROM sheet
      WHERE reference = ${reference}
      ORDER BY updatedDate DESC`
    ).catch((e) => console.error(e));
};

export default getVersionsByReference;

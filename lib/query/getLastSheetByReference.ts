import query from '../db';
import escape from 'sql-template-strings';
import { Sheet } from '../interfaces/sheet.interface';

const getSheetByReference = async (reference: string, version?:string) : Promise<Sheet[]>=> 
{
    console.debug(`getLastSheetByReference() called ; reference : ${reference} ; version : ${version}`);

    const q = typeof version !== 'undefined' && version !== 'undefined'?
        escape`
          SELECT id, reference, version, updatedDate, title, content, level, createdAdminDate
          FROM sheet
          WHERE reference = ${reference}
          AND version = ${version}
          ORDER BY updatedDate DESC
          LIMIT 1
        `
        :
        escape`
          SELECT id, reference, version, updatedDate, title, content, level, createdAdminDate
          FROM sheet
          WHERE reference = ${reference}
          ORDER BY updatedDate DESC
          LIMIT 1
        `;

    console.log(q);

    return await query(q).catch(e => console.error(e)) as Sheet[];
};

export default getSheetByReference;

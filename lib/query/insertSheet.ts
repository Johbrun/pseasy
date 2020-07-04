import query from '../db';
import escape from 'sql-template-strings';
import { SheetCreation } from '../interfaces/sheet.interface';

const insertSheet = async (sheet: SheetCreation) => {
    await query(escape`
        INSERT INTO sheet (reference, version, title, content, updatedDate, idCategory)
        VALUES (${sheet.reference},${sheet.version},${sheet.title},${sheet.content},${sheet.updatedDate}, 0)`); /*.catch(e => 
    {
        console.error(`Error when inserting '${sheet.title}' : ${e.sqlMessage}`);
        console.debug(sheet);
        throw e;
    });*/
};

export default insertSheet;

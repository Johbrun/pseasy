import query from '../db';
import escape from 'sql-template-strings';
import { SheetCreation } from '../interfaces/sheet.interface';

const insertSheet = async (sheet: SheetCreation) => 
{
    let i = 0;
    await query(
        escape`INSERT INTO sheet (id, reference, version, title, content, updatedDate, idCategory)
     VALUES (${sheet.id},${sheet.reference},${sheet.version},${sheet.title},${sheet.content},${sheet.updatedDate}, 0)`
    ).catch(e => 
    {
        console.error(`Error when inserting '${sheet.title}' (${sheet.id}) : ${e.sqlMessage}`);
        console.debug(sheet);
        throw e;
    });
};

export default insertSheet;

import query from "../db";
import escape from "sql-template-strings";
import { SheetCreation } from "../interfaces/sheet.interface";

const insertSheet = async (sheet: SheetCreation) => {
  let i = 0;
  await query(
    escape`INSERT INTO sheet (id, reference, version, title, content, updatedDate, idCategory)
     VALUES (${sheet.id},${sheet.reference},${sheet.version},${sheet.title},${sheet.content},${sheet.updatedDate}, 0)`
  ).catch(e => console.error(e));
};

export default insertSheet;

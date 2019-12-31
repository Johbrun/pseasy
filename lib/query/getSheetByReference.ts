import query from "../db";
import escape from "sql-template-strings";

const getSheetByReference = async (reference: string) => {
  return await query(escape`
    SELECT id, reference, version, updatedDate, title, content, level, createdAdminDate
    FROM sheet
    WHERE reference = ${reference}
  `).catch(e => console.error(e));
};

export default getSheetByReference;

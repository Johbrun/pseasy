import query from "../db";
import escape from "sql-template-strings";

const getSummary = async () => {
  return await query(
    escape`SELECT id, reference, title, idCategory
      FROM sheet
      ORDER BY id`
  ).catch(e => console.error(e));
};

export default getSummary;

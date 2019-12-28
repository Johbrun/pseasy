import query from "../db";
import escape from "sql-template-strings";
import { SheetCreation } from "../interfaces/sheet.interface";
import { Category } from "../interfaces/category.interface";

const updateSheetsCategory = async () => {
  console.debug("updateSheetsCategory() called");

  const categories = (await query(
    escape`SELECT id, number, name FROM category`
  )) as Category[];

  const sheets = (await query(escape`SELECT id, reference FROM sheet`)) as {
    id: string;
    reference: string;
  }[];

  for (const sheet of sheets) {
    if (typeof sheet !== undefined) {
      let cn = `${
        sheet.reference.substring(0, 2) === "FT" ? "2" : "1"
      }.${+sheet.reference.substring(2, 4)}`;

      console.log(cn);
      let catNumber = categories.find(c => c.number === cn)?.id;

      console.log(
        `UPDATE sheet SET idCategory = ${catNumber} WHERE id = ${sheet.id} (sheet ${sheet.reference})`
      );
      if (catNumber || catNumber === 0) {
        await query(
          escape`UPDATE sheet SET idCategory = ${catNumber} WHERE sheet.id = ${sheet.id}`
        );
      } else {
        console.error(
          `Unable to update sheet ${sheet.id} with category number ${catNumber}`
        );
      }
    }
  }
};

export default updateSheetsCategory;

import query from "../db";
import escape from "sql-template-strings";
import { CategoryCreation } from "../interfaces/category.interface";

const insertCategories = async (categories: CategoryCreation[]) => {
  let i = 0;
  for (const category of categories) {
    await query(
      escape`INSERT INTO category VALUES (${i++}, ${category.number}, ${
        category.name
      })`
    ).catch(e => console.error(e));
  }
};

export default insertCategories;

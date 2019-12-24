import query from "../db";
import escape from "sql-template-strings";

const clean = async () => {
  const res1 = await query(escape`DELETE FROM sheet`);
  // const res2 = await query(escape`DELETE FROM category`);
  console.log(res1);
};

export default clean;

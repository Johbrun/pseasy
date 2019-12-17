import query from "../../../lib/db";
import escape from "sql-template-strings";
import * as express from "express";

module.exports = async (req: express.Request, res: express.Response) => {
  const sheet = await query(escape`
    SELECT id, reference, version, updatedDate, title, content, level, createdAdminDate, updatedAdminDate
    FROM sheet
    WHERE reference = ${req.query.reference}
  `);
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(sheet);
};

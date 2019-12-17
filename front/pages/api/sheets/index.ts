// const db = require("../../lib/db");
import escape from "sql-template-strings";
import * as express from "express";
import query from "../../../lib/db";

module.exports = async (req: express.Request, res: express.Response) => {
  const sheets = await query(escape`
        SELECT id, reference, title
        FROM sheet
        ORDER BY id
      `);

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(sheets);
};

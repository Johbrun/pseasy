import * as express from "express";
import getSheetByReference from "../../../lib/query/getSheetByReference";

module.exports = async (req: express.Request, res: express.Response) => {
  const sheet = await getSheetByReference(req.query.reference);
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(sheet);
};

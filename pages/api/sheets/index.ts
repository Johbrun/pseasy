import * as express from "express";
import getSummary from "../../../lib/query/getSummary";

module.exports = async (req: express.Request, res: express.Response) => {
  const sheets = await getSummary();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(sheets);
};

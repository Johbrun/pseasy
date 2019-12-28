import * as express from "express";
import getCategories from "../../../lib/query/getCategories";

module.exports = async (req: express.Request, res: express.Response) => {
  const categories = await getCategories();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(categories);
};

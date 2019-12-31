import clean from "../../lib/query/clean";
import * as express from "express";
import parser from "../../lib/parser";

module.exports = async (req: express.Request, res: express.Response) => {
  parser();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json("hello");
};

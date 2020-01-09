import * as express from "express";
import getSummary from "../../../lib/query/getSummary";

module.exports = async (req: express.Request, res: express.Response) => {
  if (req.method === "GET") {
    const sheets = await getSummary();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(sheets);
  } else if (req.method === "POST") {
    res.status(501).json({ error: "Not implemented" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

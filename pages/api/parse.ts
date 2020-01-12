import clean from '../../lib/query/clean';
import { parser } from '../../lib/parser';
import * as express from 'express';

module.exports = async (req: express.Request, res: express.Response) => 
{
    parser();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json('hello');
};

import * as express from 'express';
import { ErrorCodes } from '../errorCodes';
import getQuizzQuestions from '../../../lib/query/getQuizzQuestions';
import { queryToVisitUser } from '../../../lib/helpers/queryToUserVisit';
import saveNewVisitor from '../../../lib/actions/saveNewVisitor';

module.exports = async (req: express.Request, res: express.Response) => {
    const visitUser = queryToVisitUser(req)
    try {
        saveNewVisitor(queryToVisitUser(req))
    } catch (e) {
        console.error(e)
    }

    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        console.log(visitUser)
        const categories = await getQuizzQuestions();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(categories);
    }
    else {
        res.status(405).json({ error: ErrorCodes.Method_Not_Allowed });
    }
};

import axios from 'axios';
import { queryToVisitUser } from '../lib/helpers/queryToUserVisit';
import { Request } from 'express';
import { IncomingMessage } from 'http';

const postVisit = async (req: Request | IncomingMessage) => {
    if (!req) return;
    try {
        const visitUser = queryToVisitUser(req)
        console.log('post visit... from ' + visitUser.ip);
        await axios.request({ method: 'POST', url: `${process.env.API_URL}/api/visits`, data: visitUser });
        console.log('post visit... from ' + visitUser.ip + ' [OK]');
    }
    catch (e) {
        console.error('Error when posting visit ', e);
    }
};

export {
    postVisit
};
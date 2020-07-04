import axios from 'axios';
import { queryToVisitUser } from '../lib/helpers/queryToUserVisit';
import { Request } from 'express';
import { IncomingMessage } from 'http';

const postVisit = async (req: Request | IncomingMessage) => {
    if (!req) return;
    try {
        // <<<<<<< HEAD
        const visitUser = queryToVisitUser(req);
        console.log('post visit... from ' + visitUser.ip);
        const res = await axios.request({
            method: 'POST',
            url: `${process.env.API_URL}/api/visits`,
            data: visitUser,
        });
        console.log('post visit... from ' + visitUser.ip + ' [OK]');
        return res;
        // =======
        //         let ip;
        //         const forwarded = req.headers['x-forwarded-for'];
        //         if (forwarded)
        //         {
        //             ip = forwarded.split(/, /)[0];
        //         }
        //         else
        //         {
        //             ip = req.connection ? req.connection.remoteAddress : '';
        //         }
        //         const url = req.url;

        //         const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

        //         console.log('post visit... from ' + ip);
        //         const data: VisitUserCreation = { ip, url, userAgent };
        //         const res = (await axios.request({ method: 'POST', url: `${process.env.API_URL}/api/visits`, data }))
        //             .data as { idUser : string};
        //         console.log('post visit... from ' + ip + ' [OK] ', res);
        //         return res ;
        // >>>>>>> :sparkles: quizz client side
    } catch (e) {
        console.error('Error when posting visit ', e);
    }
};

export { postVisit };

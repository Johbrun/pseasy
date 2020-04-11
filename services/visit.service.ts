import axios from 'axios';
import crypto from 'crypto';
import { VisitCreation, VisitUserCreation } from '../lib/interfaces/visit.interface';

const postVisit = async (req: any) => {
    if (!req) return;
    try {
        let ip;
        const forwarded = req.headers['x-forwarded-for'];
        if (forwarded) {
            ip = forwarded.split(/, /)[0]
        }
        else {
            ip = req.connection ? req.connection.remoteAddress : '';
        }
        const url = req.url;
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

        console.log('post visit... from ' + ip);
        const data: VisitUserCreation = { ip, url, userAgent };
        await axios.request({ method: 'POST', url: `${process.env.API_URL}/api/visits`, data });
        console.log('post visit... from ' + ip + ' [OK]');
    }
    catch (e) {
        console.error('Error when posting visit ', e);
    }

};

export {
    postVisit
};
import axios from 'axios';
import crypto from 'crypto';
import { VisitCreation } from '../lib/interfaces/visit.interface';

const postVisit = async (req: any) => 
{
    if (!req) return;
    try
    {

        
        const ip = req.connection ? req.connection.remoteAddress : '';
        const url = req.url;

        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
        const idVisitor = crypto.createHash('md5').update(ip+userAgent).digest('hex').toString();

        console.log('post visit... from ' + ip);
        const data : VisitCreation = {ip, url, userAgent, idVisitor};
        await axios.request({ method : 'POST', url: `${process.env.API_URL}/api/visits`, data});
        console.log('post visit... from ' + ip + ' [OK]');
    }
    catch(e)
    {
        console.error('Error when posting visit ' ,  e);
    }
   
};

export {
    postVisit
};
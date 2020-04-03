import axios from 'axios';
import { VisitCreation } from '../lib/interfaces/visit.interface';

const postVisit = async (req: any) => 
{
    if (!req) return;
    try
    {
        const ip = req.ip;
        const url = req.url;
        console.log(req);
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    
        console.log('post visit...');
        const data : VisitCreation = {ip, url, userAgent};
        await axios.request({ method : 'POST', url: `${process.env.API_URL}/api/visits`, data});
        console.log('post visit... [OK]');
    }
    catch(e)
    {
        console.error('Error when posting visit ' ,  e);
    }
   
};

export {
    postVisit
};
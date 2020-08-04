import { Request } from 'express';
import { VisitUserCreation } from '../interfaces/visit.interface';
import { IncomingMessage } from 'http';

export function queryToVisitUser(req: Request | IncomingMessage) {


    let ip;
    const forwarded = req.headers ? req.headers['x-forwarded-for'] as string : undefined;
    if (forwarded) {
        ip = forwarded.split(/, /)[0];
    } else {
        ip = req.connection?.remoteAddress ? req.connection.remoteAddress : '';
    }
    const url = req.url ? req.url : '';
  /*  const userAgent = req.headers
        ? req.headers['user-agent']
        : navigator ? navigator.userAgent : 'undefined';*/


    const data: VisitUserCreation = { ip, url, userAgent : 'null'};
    return data;
}

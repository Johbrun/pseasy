import { Request } from 'express';
import { VisitUserCreation } from '../interfaces/visit.interface';
import { IncomingMessage } from 'http';

export function queryToVisitUser(req: Request | IncomingMessage) {
    let ip;
    const forwarded = req.headers['x-forwarded-for'] as string;
    if (forwarded) {
        ip = forwarded.split(/, /)[0]
    }
    else {
        ip = req.connection?.remoteAddress ? req.connection.remoteAddress : '';
    }
    const url = req.url ? req.url : '';
    const userAgent = req.headers['user-agent'] ? req.headers['user-agent'] : navigator.userAgent;

    const data: VisitUserCreation = { ip, url, userAgent };
    return data;
}
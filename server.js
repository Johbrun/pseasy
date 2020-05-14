const cacheableResponse = require('cacheable-response');
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const defaultRequestHandler = app.getRequestHandler();

console.log('Using dev mode  ? ', dev);

const ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res, pagePath, queryParams }) => ({
        data: await app.renderToHTML(req, res, pagePath, queryParams),
    }),
    send: ({ data, res }) => res.send(data),
});

app.prepare().then(() => {
    const server = express();

    server.get('/_next/*', (req, res) => {
        defaultRequestHandler(req, res);
    });

    server.get('*', (req, res) => {
        if (/*dev || */req.query.noCache) { // FIX THAAAAAAAAAAAAAAAT
            res.setHeader('X-Cache-Status', 'DISABLED');
            defaultRequestHandler(req, res);
        }
        else {
            ssrCache({ req, res, pagePath: req.path });
        }
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

const morgan = require('morgan')

const info = (...params) => {
    if (process.env.NODE_ENV !== 'test'){
        console.log(...params)
    }
}

const error = (...params) => {
    console.error(...params)
}

const morganInit = (app) => {
    if (process.env.NODE_ENV !== 'test'){
        // Morgan setup for logging requests
        app.use(morgan((tokens, req, res) => {
            const post = JSON.stringify(res.req.body);
            const avoidAnnoyingBrackets = post !== '{}' ? post : '';
        
            return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            avoidAnnoyingBrackets,
            ].join(' ');
        }));
        
    }
}

module.exports = {
    info,
    error,
    morganInit
}
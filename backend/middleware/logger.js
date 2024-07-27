import colors from 'colors';

const colorMap = {
    GET: 'brightGreen',
    POST: 'yellow',
    PUT: 'blue',
    DELETE: 'red',
}

const logger = (req, res, next) => {
    const color = colorMap[req.method] || 'white';
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
};

export default logger;
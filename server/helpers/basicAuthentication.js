const StaffService = require('../services/StaffService.js');

async function basicAuthentication(req, res, next) {

    if (req.path === '/staff/authenticate') {
        return next();
    }

    if (req.method == 'GET' && req.path.startsWith('/camps')) {
        return next();
    }

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing authorization header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    var staffService = new StaffService();
    const user = await staffService.authenticate(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid authentication credentials' });
    }

    req.user = user

    next();
}

module.exports = basicAuthentication;
const cookieParser = require('cookie-parser');
const navJS = require('../public/js/navbarJS');
const jwt = require('jsonwebtoken');

async function sessionMiddleware(req, res, next) {
    if (!req.cookies.BlogApplication) {
        return res.status(404).send(`<html>
          <head>
            <title>My Node.js App</title>
          </head>
          <body>
            <h1>Session Expired!</h1>
            <p><a href="/signin">Click here to login</a></p>
          </body>
        </html>`);
    }

    await jwt.verify(req.cookies.BlogApplication, process.env.SECRET_KEY, function (err, payload) {
        if (err) {
            console.log('Signature Tampered');
            return res.status(400).send('Invalid token.... Login again');
        }
        req.payload = payload;
        next()
    });

}


module.exports = sessionMiddleware;
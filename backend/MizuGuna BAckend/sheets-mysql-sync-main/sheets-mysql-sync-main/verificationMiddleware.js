const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: "Invalid Authorization format" });
    }

    const token = tokenParts[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        req.user = user; // Attach decoded user to request
        next(); // Continue to the next middleware or route
    });
}

module.exports = verifyToken;
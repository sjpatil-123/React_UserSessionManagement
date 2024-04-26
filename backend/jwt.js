const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ||'default'; 
const jwtAuthMiddleware = (req, res, next) => {
    const autthorization=req.headers.authorization;
    if(!autthorization) return res.status(401).json({ error: 'Token not found' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const generateToken = (userData) => {
    return jwt.sign(userData, JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };

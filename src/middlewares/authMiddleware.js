const jwt = require('jsonwebtoken');
// const User = require('../models/user.js');
// import { User } from '../db/models/user.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ status: 401, message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role }; // додаємо user info до req
    next();
  } catch (err) {
    res
      .status(401)
      .json({ status: 401, message: 'Invalid token' }, { errors: err.details });
  }
};

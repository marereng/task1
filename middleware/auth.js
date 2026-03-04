import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Ambil token dari header 'Authorization' (format: Bearer <token>)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Masukkan payload token ke request
    next();
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid atau kadaluwarsa" });
  }
};

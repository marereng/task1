import express from "express";
import crypto from 'crypto'; 
import { User } from "../models/user.js";

const router = express.Router();

// HELPER: Fungsi hash super simpel (Input -> SHA256 -> Hex)
const getHash = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Simpan password langsung dalam bentuk hash SHA256
    await User.create({ 
      username, 
      email,
      password: getHash(password) 
    });
    
    res.status(201).json({ 
      message: "User berhasil dibuat",
      username: username,
      passwordHash: getHash(password) // Hanya untuk demo, jangan kirim hash ke client di aplikasi nyata!
     });
  } catch (err) {
    res.status(400).json({ message: "Username sudah ada atau error database" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Cari user berdasarkan username
    const user = await User.findOne({ username });
    
    // Cukup bandingkan hash input dengan yang ada di DB
    if (user && user.password === getHash(password)) {
      // Tanpa JWT, kita hanya kirim data user saja sebagai tanda sukses
      return res.json({ 
        success: true, 
        message: "Login Berhasil",
        user: { username: user.username, id: user._id } 
      });
    }

    res.status(401).json({ success: false, message: "Username atau Password salah!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
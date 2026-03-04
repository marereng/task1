import express from "express";
import crypto from 'crypto';
import jwt from 'jsonwebtoken'; // 1. Import JWT
import 'dotenv/config'; // load .env variables
import nodemailer from 'nodemailer';
import { User } from "../models/user.js";

const router = express.Router();

// Konfigurasi Transporter (Gunakan Gmail atau layanan lain)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Alamat email kamu
    pass: process.env.EMAIL_PASS  // App Password (bukan password akun biasa)
  }
});

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

    // 3. Logika Kirim Email
    const mailOptions = {
      from: '"My Cool App" <noreply@myapp.com>',
      to: email,
      subject: 'Selamat Datang!',
      text: `Halo ${username}, akun kamu berhasil dibuat!`,
      html: `<b>Halo ${username}!</b><p>Selamat bergabung di aplikasi kami.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Gagal kirim email:", error);
      } else {
        console.log("Email terkirim:", info.response);
      }
    });

    res.status(201).json({
      message: "User berhasil dibuat & Email dikirim",
      username: username
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

      const payload = {
        id: user._id,
        username: user.username,
        email: user.email
      };

      const token = jwt.sign(payload,
        process.env.JWT_SECRET, {
        expiresIn: '1h' // Token hangus dalam 1 jam
      });

      return res.json({
        success: true,
        message: "Login Berhasil",
        token: token,
        username: user.username,
        id: user._id,
        email: user.email
      });
    }

    res.status(401).json({ success: false, message: "Username atau Password salah!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
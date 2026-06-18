import type { NextApiRequest, NextApiResponse } from 'next';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    // Kiểm tra email tồn tại
    const existingUser = await sql(`SELECT id FROM users WHERE email = $1`, [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email này đã được sử dụng' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu vào database
    await sql(
      `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'user')`,
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống khi đăng ký', error: error.message });
  }
}


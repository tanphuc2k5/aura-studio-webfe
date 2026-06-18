import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    // Kiểm tra email tồn tại
    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'Email này đã được sử dụng' });
    }

    // Tạo user mới
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Trong thực tế: await bcrypt.hash(password, 10)
      role: 'user'
    };

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống khi đăng ký' });
  }
}

"use client"; // ระบุว่าโค้ดนี้รันบนฝั่ง Client เท่านั้น

import Button from "@/app/components/material/button";
import Input from "@/app/components/material/input";
import { fetchActionApi } from "@/app/utils/action"; // นำเข้า fetchActionApi สำหรับเรียก API
import { useState } from "react"; // นำเข้า useState สำหรับจัดการ state

export default function Register() {
  // กำหนด state สำหรับเก็บค่าชื่อผู้ใช้, อีเมล, รหัสผ่าน และยืนยันรหัสผ่าน
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ฟังก์ชัน register ทำงานเมื่อผู้ใช้กดปุ่มสมัครสมาชิก
  const register = async (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้าเมื่อ submit form

    // ตรวจสอบว่ารหัสผ่านและการยืนยันรหัสผ่านตรงกันหรือไม่
    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    // สร้างอ็อบเจ็กต์ body เพื่อส่งข้อมูลลงทะเบียน
    let body = {
      username: username, // ชื่อผู้ใช้
      email: email, // อีเมล
      password: password, // รหัสผ่าน
    };

    // เรียก API เพื่อลงทะเบียน
    const res = await fetchActionApi("/api/auth/local/register", {
      method: "POST",
      body: JSON.stringify(body), // แปลงข้อมูลเป็น JSON
    });

    // ตรวจสอบผลลัพธ์จาก API
    if (res) {
      if (res.status === 200) {
        // ถ้าสมัครสำเร็จ เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
        window.location.href = "/login";
      } else {
        // ถ้าสมัครไม่สำเร็จ แสดงข้อความแจ้งเตือน
        alert("สมัครสมาชิกไม่สําเร็จ");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          สมัครสมาชิก
        </h2>
        {/* ฟอร์มสำหรับสมัครสมาชิก */}
        <form onSubmit={(e) => register(e)} className="space-y-4">
          {/* ช่องกรอกชื่อผู้ใช้ */}
          <Input 
            type="text" 
            id="username"  
            value={username} 
            label="ชื่อผู้ใช้" 
            onChange={(e) => setUsername(e.target.value) } required
          />
          {/* ช่องกรอกอีเมล */}
          <Input 
            type="email" 
            id="email"  
            value={email} 
            label="อีเมล" 
            onChange={(e) => setEmail(e.target.value) } required
          />
          {/* ช่องกรอกรหัสผ่าน */}
          <Input 
            type="password" 
            id="password"  
            value={password} 
            label="รหัสผ่าน" 
            onChange={(e) => setPassword(e.target.value) } required
          />
          {/* ช่องกรอกยืนยันรหัสผ่าน */}
          <Input 
            type="password" 
            id="confirmPassword"  
            value={confirmPassword} 
            label="ยืนยันรหัสผ่าน" 
            onChange={(e) => setConfirmPassword(e.target.value) } required
          />
          {/* ปุ่มกดสมัครสมาชิก */}
         <Button type="submit" label="สมัครสมาชิก"/>
        </form>
      </div>
    </div>
  );
}

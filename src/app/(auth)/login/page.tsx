"use client"; // ระบุว่าโค้ดนี้รันบนฝั่ง Client เท่านั้น

import Button from "@/app/components/material/button";
import Input from "@/app/components/material/input";
import { fetchActionApi, setAccessToken } from "@/app/utils/action"; // นำเข้า fetchActionApi สำหรับเรียก API และ setAccessToken สำหรับจัดการ token
import { useState } from "react"; // นำเข้า useState สำหรับจัดการ state

// ประกาศ Interface สำหรับโครงสร้างข้อมูลที่คาดว่าจะได้รับจาก API
interface LoginResponse {
  jwt: string; // Token ที่ใช้สำหรับ Authentication
  user: {
    id: number;
    documentId: number;
  };
}

export default function Login() {
  // กำหนด state สำหรับเก็บค่าชื่อผู้ใช้และรหัสผ่าน
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // ฟังก์ชัน login ทำงานเมื่อผู้ใช้กดปุ่มเข้าสู่ระบบ
  const login = async (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้าเมื่อ submit form

    // สร้างอ็อบเจ็กต์ body เพื่อส่งข้อมูลเข้าสู่ระบบ
    let body = {
      identifier: identifier, // ชื่อผู้ใช้ที่ป้อนจากฟอร์ม
      password: password, // รหัสผ่านที่ป้อนจากฟอร์ม
    };

    // เรียก API เพื่อตรวจสอบข้อมูลการเข้าสู่ระบบ
    const res = await fetchActionApi("/api/auth/local", {
      method: "POST", // ใช้เมธอด POST เพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์
      body: JSON.stringify(body), // แปลงข้อมูลเป็น JSON ก่อนส่งไปยัง API
    } as any);

    console.log(res); // แสดงผลข้อมูลที่ได้จาก API ใน console (สำหรับ debug)

    // ตรวจสอบผลลัพธ์จาก API
    if (res) {
      if (res.status === 200) {
        // ถ้าเข้าสู่ระบบสำเร็จ
        const token = res.data as LoginResponse; // แปลงข้อมูลที่ได้รับให้อยู่ในรูปแบบของ LoginResponse
        await setAccessToken(token.jwt); // บันทึก token ลงใน cookie
        
        // ให้เปลี่ยนเส้นทางไปที่หน้าแรก
        window.location.href = "/";
      } else {
        // ถ้าล้มเหลว แสดงข้อความแจ้งเตือน
        alert("เข้าสู่ระบบไม่สําเร็จ");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          เข้าสู่ระบบ
        </h1>
        <form onSubmit={(e) => login(e)}>
        <Input 
          type="text" 
          id="identifier" 
          value={identifier} 
          label="ชื่อผู้ใช้" 
          onChange={(e) => setIdentifier(e.target.value) } required
        />
          <Input 
          type="password" 
          id="password" 
          value={password} 
          label="รหัสผ่าน" 
          onChange={(e) => setPassword(e.target.value)} required
        />
        <Button label="เข้าสู่ระบบ"  type="submit" />

        </form>
      </div>
    </div>
  );
}

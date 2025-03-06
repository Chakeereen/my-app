"use server"; // ระบุว่าโค้ดนี้รันบนฝั่ง Server เท่านั้น (ใช้กับ Next.js 13+ และ Server Actions)

import { cookies } from "next/headers"; // นำเข้าโมดูลสำหรับจัดการคุกกี้ในฝั่งเซิร์ฟเวอร์
import { fetchApi } from "./fetch"; // นำเข้า fetchApi สำหรับเรียก API

// ฟังก์ชันสำหรับตั้งค่า access token ลงในคุกกี้
export const setAccessToken = async (token: string) => {
  const cookie = await cookies(); // ดึงข้อมูลคุกกี้ปัจจุบัน
  cookie.set("access_token", `${token}`, {
    maxAge: 60 * 60 * 24 * 30, // กำหนดอายุของคุกกี้เป็น 30 วัน (60 วินาที * 60 นาที * 24 ชั่วโมง * 30 วัน)
  });
};

export const removeAccessToken = async () => {
  const cookie = await cookies(); // ดึงข้อมูลคุกกี้ปัจจุบัน
  cookie.delete("access_token");
}

// ฟังก์ชันสำหรับเรียก API โดยใช้ fetchApi
export const fetchActionApi = async <T>(
  path: string, // พาธของ API ที่ต้องการเรียก
  options: RequestInit & {} = {
    method: "GET", // กำหนดค่าเริ่มต้นของ method เป็น GET
  },
  populate?: any, // ใช้สำหรับกำหนดข้อมูลที่ต้องการดึงเพิ่มเติมจาก API
  filters?: any, // ใช้สำหรับกำหนดตัวกรองข้อมูลจาก API
) => {
  // เรียกใช้ฟังก์ชัน fetchApi และส่งพารามิเตอร์ที่ได้รับมา
  return fetchApi<T>(path, options, populate, filters);
};

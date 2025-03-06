import { cookies } from "next/headers"; // ใช้สำหรับดึงค่าคุกกี้ใน Next.js
import qs from "qs"; // ใช้สำหรับแปลงอ็อบเจ็กต์เป็น query string

// ประกาศอินเทอร์เฟซสำหรับโครงสร้างข้อมูลที่ใช้ในการตอบกลับ API
interface FetchResponse<T> {
    data: T | null; // ข้อมูลที่ได้จาก API
    status?: number; // สถานะของการตอบกลับ
    error?: {}; // ข้อมูลข้อผิดพลาด (ถ้ามี)
}

// ฟังก์ชันสำหรับเรียก API
export const fetchApi = async <T>(
    path: string, // พาธของ API ที่ต้องการเรียก
    options: RequestInit & {} = { method: "GET" }, // ตัวเลือกสำหรับการเรียก API (ค่าเริ่มต้นเป็น GET)
    populate?: any, // ใช้สำหรับระบุข้อมูลที่ต้องการดึงเพิ่มเติมจาก API
    filters?: any // ใช้สำหรับกรองข้อมูลที่ต้องการจาก API
): Promise<FetchResponse<T>> => {
    let headers = {}; // ตัวแปรสำหรับเก็บค่า headers

    // ดึงค่าคุกกี้
    const coockie = await cookies();
    const accessToken = coockie.get("access_token")?.value || ""; // ดึงค่า access_token จากคุกกี้

    // กำหนด headers ตามเงื่อนไขว่ามี access_token หรือไม่
    if (accessToken !== "") {
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // แนบ Token เพื่อใช้ยืนยันตัวตน
        };
    } else {
        headers = {
            "Content-Type": "application/json",
        };
    }

    let url: any; // ตัวแปรสำหรับเก็บ URL ของ API

    // ตรวจสอบว่ามีพารามิเตอร์ populate หรือไม่
    if (populate) {
        let queryParams: any = {};
        queryParams.populate = populate; // เพิ่ม populate เข้าไปใน query parameters
        if (filters) {
            queryParams.filters = filters; // เพิ่ม filters เข้าไปใน query parameters
        }

        // สร้าง URL โดยใช้ base URL จากตัวแปร environment และพาธที่กำหนด
        const newUrl = new URL(path, process.env.API_URL);
        
        // แปลง query parameters เป็น query string และแนบไปกับ URL
        newUrl.search = qs.stringify(queryParams);
        url = newUrl;
    } else {
        // ถ้าไม่มี populate ให้ใช้ URL ธรรมดา
        url = `${process.env.API_URL}${path}`;
    }

    try {
        // เรียก API ด้วย fetch และแนบ options และ headers
        const response = await fetch(url, { ...options, headers });

        // ตรวจสอบว่าการเรียก API สำเร็จหรือไม่
        if (!response.ok) {
            throw new Error("Failed to fetch team members"); // ถ้าไม่สำเร็จให้โยน error
        }

        // แปลงข้อมูลที่ได้จาก API เป็น JSON
        const result = await response.json();

        // ส่งค่ากลับไปในรูปแบบของ FetchResponse
        return { 
            data: result,
            status: response.status,
        };
    } catch (error: unknown) {
        // ถ้ามีข้อผิดพลาด ให้ส่งค่ากลับพร้อม error message
        return { data: null, status: 500, error: "error" };
    }
};

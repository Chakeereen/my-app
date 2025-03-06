import qs from "qs"; // ใช้สำหรับสร้าง query string
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "../utils/fetch"; // ฟังก์ชันที่ใช้ดึงข้อมูลจาก API

// กำหนดประเภทข้อมูลสำหรับสมาชิกในทีม
interface TeamMemberProps {
    id: number;
    documentId: string;
    name: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    photo: {
      id: number;
      documentId: string;
      alternativeText: string;
      name: string;
      url: string;
    };
}
  
// คอมโพเนนต์สำหรับแสดงการ์ดของสมาชิกในทีม
function TeamMemberCard({
    name,
    description,
    photo,
    slug,
}: Readonly<TeamMemberProps>) {
    // กำหนด URL ของรูปภาพ โดยใช้ API_URL ถ้าเซ็ตไว้ มิฉะนั้นใช้ localhost
    const imageUrl = `${process.env.API_URL ?? 'https://server-g8da.onrender.com'}${photo.url}`;
    
    return (
      <Link
        href={`/our-team/${slug}`} // ลิงก์ไปยังหน้ารายละเอียดของสมาชิกในทีม
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        {/* แสดงภาพของสมาชิกในทีม */}
        <Image
          src={imageUrl}
          alt={photo.alternativeText || name}
          width={500}
          height={500}
        />
        <div className="p-6">
          {/* แสดงชื่อสมาชิก */}
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          {/* แสดงคำอธิบายเกี่ยวกับสมาชิก */}
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    );
}

// ฟังก์ชันดึงข้อมูลสมาชิกในทีมจาก API
async function getTeamMembers() {
    // เรียก API และดึงเฉพาะข้อมูลที่ต้องการ เช่น รูปภาพ และรายละเอียดของสมาชิก
    const res = await fetchApi("/api/team-members", {}, {
      photo: {
        fields: ['alternativeText', 'name', 'url']
      },
    });

    // ตรวจสอบว่ามีข้อมูลหรือไม่ และตรวจสอบสถานะของ response
    if(res) {
      if (res.status !== 200) {
        return res.data;
      }
    }   
    
    return res.data;
}
  
// คอมโพเนนต์หลักสำหรับหน้า "Our Team"
export default async function OurTeam() {
    // ดึงข้อมูลสมาชิกในทีม
    const teamMembers: any = await getTeamMembers();
  
    return (
      <div>
        {/* หัวข้อหลักของหน้า */}
        <h1 className="text-3xl font-bold mb-8">Our Team</h1>
        
        {/* แสดงสมาชิกในทีมเป็น Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* วนลูปสร้างการ์ดสำหรับสมาชิกแต่ละคน */}
          {teamMembers.data.map((member: TeamMemberProps) => (
            <TeamMemberCard key={member.documentId} {...member} />
          ))}
        </div>
      </div>
    );
}
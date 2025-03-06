import qs from "qs";
import Link from "next/link";
import Image from "next/image";
import { fetchApi } from "../utils/fetch";
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
  
  function TeamMemberCard({
    name,
    description,
    photo,
    slug,
  }: Readonly<TeamMemberProps>) {
    const imageUrl = `${
      process.env.API_URL ?? "http://localhost:1337"
    }${photo.url}`;
    return (
      <Link
        href={`/our-team/${slug}`}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={photo.alternativeText || name}
          width={500}
          height={500}
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
    );
  }

async function getTeamMembers() {
    const res = await fetchApi("/api/team-members", {},{
      photo: {
                  fields: ['alternativeText', 'name', 'url']
                },
    });

    // url.search = qs.stringify({
    //     populate: {
    //         photo: {
    //           fields: ['alternativeText', 'name', 'url']
    //         },
    //         blocks: {
    //             on: {
    //               'blocks.testimonial': {
    //                 populate: {
    //                   photo: {
    //                     fields: ['alternativeText', 'name', 'url']
    //                   }
    //                 }
    //               },
    //             }
    //           }
    //         },
    //         // filters: {
    //         //   slug: {
    //         //     $eq: "pongsakorn" // This is the slug for our team member ***คอมเมนต์ได้ถ้าไม่อยากใช้
    //         //   }
    //         // }
    //       }
    //     );
  
    // const res = await fetch(url);
  
    // if (!res.ok) throw new Error("Failed to fetch team members");
  
    // const data = await res.json();
    // console.log(data);
  if(res) {
    if (res.status !== 200) {
      return res.data;
  }
}   
    // console.log(res.data);
    return res.data;
  }
  
  export default async function OurTeam() {
    const teamMembers: any = await getTeamMembers();
  
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.data.map((member: TeamMemberProps) => (
            <TeamMemberCard key={member.documentId} {...member} />
          ))}
        </div>
      </div>
    );
  }
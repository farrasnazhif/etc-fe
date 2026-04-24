import SectionTitle from "@/components/ui/section-title";
import Image from "next/image";

export default function MeetOurTeamSection() {
  const data = [
    {
      name: "Farras Nazhif Pratikno",
      title: "Frontend Engineer",
      image: "/assets/team-user-1.png",
    },
    {
      name: "Kagendra Amadeo ",
      title: "Frontend Engineer",
      image: "/assets/team-user-2.png",
    },
    {
      name: "Via Hana Nurma Putri",
      title: "Frontend Engineer",
      image: "/assets/team-user-3.png",
    },
    {
      name: "Hartmann Kanisius",
      title: "Backend Engineer",
      image: "/assets/team-user-4.png",
    },
    {
      name: "Muhammad Zulfiqar",
      title: "Backend Engineer",
      image: "/assets/team-user-4.png",
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center">
      <SectionTitle
        title="Meet Our Team"
        description="Meet our team and discover how we can help you create the perfect slide using latest AI technologies."
      />
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col transition-all duration-300 hover:-translate-y-1"
          >
            <Image
              src={item.image}
              alt="User Image"
              className="h-64 w-52 object-cover"
              width={100}
              height={100}
            />
            <h3 className="mt-2 text-base font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

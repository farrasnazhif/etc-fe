import SectionTitle from "@/components/ui/section-title";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default function OurTestimonialSection() {
  const data = [
    {
      review:
        "Sangat membantu saat mencari tim untuk lomba. Prosesnya cepat dan saya bisa menemukan anggota dengan skill yang sesuai.",
      name: "Rizky Pratama",
      date: "12 Jan 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      review:
        "Dengan ETC, saya tidak perlu lagi mencari anggota tim secara manual. Semua sudah terorganisir dan lebih efisien.",
      name: "Alya Putri",
      date: "15 Mar 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      review:
        "Fitur pencarian tim sangat membantu. Saya bisa menemukan project yang sesuai dengan minat dan langsung bergabung.",
      name: "Dimas Saputra",
      date: "20 Feb 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "Platform ini memudahkan saya untuk merekrut anggota dengan kriteria tertentu. Sangat cocok untuk project kampus.",
      name: "Nadia Rahma",
      date: "20 Sep 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    },
    {
      review:
        "Saya berhasil menemukan tim untuk side project melalui ETC. Prosesnya jelas dan mudah dipahami.",
      name: "Fajar Hidayat",
      date: "04 Oct 2025",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      review:
        "Interface-nya sederhana dan mudah digunakan. Sangat membantu dalam mengelola tim dan kolaborasi.",
      name: "Siti Maharani",
      date: "01 Nov 2025",
      rating: 5,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center">
      <SectionTitle
        title="Testimoni Pengguna"
        description="Pengalaman mahasiswa dalam menggunakan ETC untuk menemukan tim dan membangun kolaborasi."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-88 space-y-4 rounded-md border border-gray-200 bg-white p-3 text-gray-500 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {Array(item.rating)
                  .fill("")
                  .map((_, index) => (
                    <StarIcon
                      key={index}
                      className="size-4 fill-gray-800 text-gray-800"
                    />
                  ))}
              </div>
              <p>{item.date}</p>
            </div>
            <p>“{item.review}”</p>
            <div className="flex items-center gap-2 pt-3">
              <Image
                className="h-8 w-8 rounded-full"
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
              <p className="font-medium text-gray-800">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

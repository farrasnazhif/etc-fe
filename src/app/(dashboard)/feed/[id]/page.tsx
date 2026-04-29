"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import DropzoneInput from "@/components/ui/dropzone-input";
import {
  Briefcase,
  Users,
  FileText,
  Calendar,
  Eye,
  MapPin,
} from "lucide-react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

const project = {
  id: "ETC-2026-001",
  title: "Pengembangan Platform Kolaborasi Mahasiswa Berbasis AI",
  category: "Teknologi Pendidikan",
  phase: "Open Recruitment",
  location: "Surabaya, Indonesia",
  banner:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600",
  description:
    "Proyek ETC ini berfokus pada pengembangan platform digital yang membantu mahasiswa menemukan tim, berkolaborasi lintas bidang, dan membangun solusi inovatif berbasis kecerdasan buatan. Tim akan mengembangkan sistem matching, dashboard kolaborasi, serta fitur AI recommendation untuk mendukung pengalaman pengguna yang lebih personal.",
  objectives: [
    "Membangun sistem pencarian dan matching anggota tim",
    "Mengembangkan dashboard kolaborasi proyek",
    "Mengintegrasikan AI recommendation untuk partner suggestion",
    "Menyediakan pengalaman digital yang relevan untuk mahasiswa",
  ],
  rolesNeeded: [
    {
      title: "Frontend Developer",
      urgency: "Prioritas",
      description:
        "Berpengalaman dengan React / Next.js dan mampu membangun UI responsif.",
    },
    {
      title: "UI/UX Designer",
      urgency: "Open",
      description:
        "Mampu merancang user flow, wireframe, dan desain modern untuk aplikasi mahasiswa.",
    },
    {
      title: "AI Engineer",
      urgency: "Open",
      description:
        "Memahami recommendation system atau machine learning dasar.",
    },
  ],
  team: [
    {
      name: "Farras Nazhif",
      role: "Project Lead",
      skill: "Product Strategy",
      image: "/assets/team-user-1.png",
    },
    {
      name: "Kagendra Amadeo",
      role: "Frontend Engineer",
      skill: "Next.js",
      image: "/assets/team-user-2.png",
    },
    {
      name: "Via Hana",
      role: "UI/UX Designer",
      skill: "Interface Design",
      image: "/assets/team-user-3.png",
    },
    {
      name: "Open Position",
      role: "Backend Engineer",
      skill: "Node.js / Golang",
      image: "/assets/default-user.png",
    },
  ],
};

export default function FeedDetailPage() {
  return (
    <DashboardLayout withNavbar withSidebar>
      <main
        data-theme="light"
        className="min-h-screen bg-slate-50 text-slate-900"
      >
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 lg:px-8">
          {/* hero */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={project.banner}
              alt={project.title}
              width={1600}
              height={700}
              className="h-[260px] w-full object-cover md:h-[360px]"
              unoptimized
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-900/30 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 text-white md:p-10">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                  {project.category}
                </span>

                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                  {project.phase}
                </span>
              </div>

              <h1 className="max-w-3xl text-2xl font-bold md:text-4xl">
                {project.title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm text-white/90 md:text-base">
                Bergabunglah dalam pengembangan ekosistem kolaborasi ETC untuk
                membangun masa depan kerja sama mahasiswa yang lebih cerdas,
                terhubung, dan inovatif.
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/85">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {project.location}
                </span>
              </div>
            </div>
          </section>

          {/* content */}
          <section className="grid gap-6 lg:grid-cols-3">
            {/* left */}
            <div className="space-y-6 lg:col-span-2">
              {/* overview */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <FileText className="size-5 text-blue-600" />
                  Ringkasan Proyek
                </h2>

                <p className="mt-4 leading-relaxed text-slate-600">
                  {project.description}
                </p>

                <div className="mt-6 space-y-3">
                  {project.objectives.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-1 size-2 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* team */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Users className="size-5 text-blue-600" />
                    Tim Inti ETC
                  </h2>

                  <p className="text-sm text-slate-500">
                    {project.team.length} anggota
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.team.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={56}
                        height={56}
                        className="size-14 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-medium text-slate-900">
                          {member.name}
                        </h3>

                        <p className="text-sm text-slate-500">{member.role}</p>

                        <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                          {member.skill}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* right */}
            <aside className="space-y-6">
              {/* roles */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Briefcase className="size-5 text-blue-600" />
                  Role Dibutuhkan
                </h2>

                <div className="mt-4 space-y-3">
                  {project.rolesNeeded.map((role, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-slate-900">
                          {role.title}
                        </h3>

                        <span className="text-xs font-medium text-blue-600">
                          {role.urgency}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-600">
                        {role.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* apply */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                  Gabung ke Tim Ini
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Isi formulir berikut untuk menunjukkan minat dan kemampuanmu.
                </p>

                <div className="mt-5 space-y-4">
                  <Select
                    label="Pilih Role"
                    placeholder="Pilih posisi"
                    options={project.rolesNeeded.map((role) => ({
                      label: role.title,
                      value: role.title,
                    }))}
                  />

                  <Input
                    label="Motivasi Singkat"
                    placeholder="Jelaskan kenapa kamu cocok..."
                  />

                  <Input label="Link CV / Portfolio" placeholder="https://" />

                  <DropzoneInput
                    label="Upload CV / Portfolio"
                    helperText="PDF maksimal 10MB"
                  />

                  <Button className="w-full">Submit Application</Button>
                </div>
              </div>

              {/* meta */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Project ID</span>
                    <span className="font-medium">{project.id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Update</span>
                    <span className="font-medium">2 hari lalu</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Views</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Eye className="size-4" />
                      1,240
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Deadline</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="size-4" />
                      14 Mei 2026
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}

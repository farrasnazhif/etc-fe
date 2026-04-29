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
  Search,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import DashboardLayout from "@/layouts/dashboard/dashboard-layout";
import { useState } from "react";

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
      image: null,
    },
    {
      name: "Kagendra Amadeo",
      role: "Frontend Engineer",
      skill: "Next.js",
      image: null,
    },
    {
      name: "Via Hana",
      role: "UI/UX Designer",
      skill: "Interface Design",
      image: null,
    },
    {
      name: "Open Position",
      role: "Backend Engineer",
      skill: "Node.js / Golang",
      image: null,
    },
  ],
};

function getAvatarColor(name: string) {
  const colors = [
    "bg-red-500/80",
    "bg-blue-500/80",
    "bg-green-500/80",
    "bg-yellow-500/80",
    "bg-purple-500/80",
    "bg-pink-500/80",
    "bg-indigo-500/80",
    "bg-teal-500/80",
  ];

  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;

  return colors[index];
}

export default function FeedDetailPage() {
  const [showApplyForm, setShowApplyForm] = useState(false);
  return (
    <DashboardLayout withNavbar withSidebar>
      <main
        data-theme="light"
        className="min-h-screen bg-slate-50 text-slate-900"
      >
        <div className="mx-auto max-w-7xl space-y-6 px-2 py-2 md:px-6 lg:px-8">
          {/* hero */}
          <section className="relative overflow-hidden rounded-md border border-slate-200 bg-white shadow-xs">
            <Image
              src={project.banner}
              alt={project.title}
              width={1600}
              height={700}
              className="h-[220px] w-full object-cover sm:h-[260px] md:h-[360px]"
              unoptimized
            />

            {/* improved gradient for mobile readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/70 to-blue-900/10 md:from-blue-950/85 md:via-blue-900/30 md:to-transparent" />

            {/* content */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:left-0 md:p-10 text-white">
              {/* badges */}
              {/* <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500 px-2.5 py-1 text-[10px] font-medium text-white sm:px-3 sm:text-xs">
                  {project.category}
                </span>

                <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-medium text-white sm:px-3 sm:text-xs">
                  {project.phase}
                </span>
              </div> */}

              {/* title */}
              <h1 className="max-w-3xl text-lg leading-tight font-bold sm:text-2xl md:text-4xl">
                {project.title}
              </h1>

              {/* description */}
              <p className="mt-2 line-clamp-3 max-w-3xl text-xs leading-relaxed text-white/90 sm:text-sm md:mt-3 md:line-clamp-none md:text-base">
                Bergabunglah dalam pengembangan ekosistem kolaborasi ETC untuk
                membangun masa depan kerja sama mahasiswa yang lebih cerdas,
                terhubung, dan inovatif.
              </p>

              {/* location */}
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/85 sm:text-sm md:mt-4">
                <span className="flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm">
                  <MapPin className="size-3.5 sm:size-4" />
                  <span className="truncate max-w-[180px] sm:max-w-none">
                    {project.location}
                  </span>
                </span>
              </div>
            </div>
          </section>

          {/* content */}
          <section className="grid gap-6 lg:grid-cols-3">
            {/* left */}
            <div className="space-y-6 lg:col-span-2">
              {/* overview */}
              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <FileText className="size-5 text-blue-800" />
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
              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Users className="size-5 text-blue-800" />
                    Tim Inti ETC
                  </h2>

                  <p className="text-sm text-slate-500">
                    {project.team.length} anggota
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.team.map((member, index) =>
                    member.name.toLowerCase() === "open position" ? (
                      <div
                        key={index}
                        className="group flex items-center gap-4 rounded-2xl border-2 border-dashed border-green-400 bg-gradient-to-br from-green-50 via-white to-green-100 p-4 transition-all duration-300  "
                      >
                        {/* icon */}
                        <div className="flex size-14 items-center justify-center rounded-full bg-green-100 text-green-700 shadow-xs transition ">
                          <Search className="size-6" />
                        </div>

                        {/* content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-green-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">
                              Open Position
                            </span>
                          </div>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {member.role}
                          </p>

                          <span className="inline-block rounded-full border border-green-300 bg-white px-2.5 py-1 text-xs font-medium text-green-700">
                            {member.skill}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                      >
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={56}
                            height={56}
                            className="size-14 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={`flex size-14 items-center justify-center rounded-full text-lg font-semibold text-white ${getAvatarColor(
                              member.name,
                            )}`}
                          >
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div>
                          <h3 className="font-medium text-slate-900">
                            {member.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {member.role}
                          </p>

                          <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                            {member.skill}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* right */}
            <aside className="space-y-6">
              {/* roles */}
              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Briefcase className="size-5 text-blue-800" />
                  Role Dibutuhkan
                </h2>

                <div className="mt-4 space-y-4">
                  {project.rolesNeeded.map((role, index) => {
                    const isPriority =
                      role.urgency.toLowerCase() === "prioritas";

                    return (
                      <div
                        key={index}
                        className={`group rounded-md border p-4 transition-all duration-300  ${
                          isPriority
                            ? "border-slate-200 border-l-4 border-l-blue-500 bg-blue-50/40 hover:border-l-blue-700"
                            : "border-slate-200 bg-slate-50/50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3
                              className={`font-semibold transition ${
                                isPriority
                                  ? "text-slate-900 group-hover:text-blue-700"
                                  : "text-slate-900"
                              }`}
                            >
                              {role.title}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              {role.description}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              isPriority
                                ? "bg-blue-100 text-blue-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {role.urgency}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* apply */}
              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                {/* header */}
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Gabung ke Tim Ini
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Tertarik menjadi bagian dari proyek ini? Tunjukkan minat dan
                    kemampuanmu untuk bergabung.
                  </p>

                  <Button
                    type="button"
                    onClick={() => setShowApplyForm(!showApplyForm)}
                    className="mt-4 w-full"
                  >
                    {showApplyForm ? (
                      <div className="flex justify-center items-center gap-2">
                        Tutup Formulir
                        <ChevronUp className="size-4" />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        Gabung Tim
                        <ChevronDown className="size-4" />
                      </div>
                    )}
                  </Button>
                </div>

                {/* expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    showApplyForm
                      ? "mt-5 max-h-[1000px] opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  }`}
                >
                  <div className="space-y-4 border-t border-slate-100 pt-5">
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
              </div>

              {/* meta */}
              <div className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
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

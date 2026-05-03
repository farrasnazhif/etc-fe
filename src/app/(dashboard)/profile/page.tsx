"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

import {
  UserPen,
  ExternalLink,
  Users,
  GraduationCap,
  Phone,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import EditProfileModal from "@/features/profile/edit-profile-modal";
import AddProjectModal from "@/features/profile/add-project-modal";

function ProfileContent() {
  const {
    user,
    isAuthenticated,
    isLoadingUser,
    updateUser,
    updateProfilePicture,
  } = useAuth();

  const isDosen = user?.role === "dosen";

  const { addToast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleEditProfile = () => setIsEditModalOpen(true);

  const handleTambahProyek = () => setIsAddProjectModalOpen(true);

  const handleCloseAddProject = () => setIsAddProjectModalOpen(false);

  const handleUbahFoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setIsUploadingPhoto(true);

      await updateProfilePicture.mutateAsync({
        file,
      });

      addToast("Foto profil berhasil diperbarui!", "success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal memperbarui foto profil.";

      addToast(message, "error");
    } finally {
      setIsUploadingPhoto(false);

      // reset input biar file sama bisa dipilih ulang
      event.target.value = "";
    }
  };

  const handleSaveProfile = async (formData: {
    nama: string;
    jurusan: string;
    no_telp: string;
    spesialisasi: string[];
  }) => {
    try {
      await updateUser.mutateAsync({
        nama: formData.nama,
        jurusan: formData.jurusan,
        no_telp: formData.no_telp,
        spesialisasi: formData.spesialisasi,
      });

      addToast("Profil berhasil diperbarui!", "success");

      setIsEditModalOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal memperbarui profil.";

      addToast(message, "error");
    }
  };

  function getGoogleDriveImageUrl(url: string) {
    if (!url) return "";

    const fileIdMatch =
      url.match(/\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);

    if (!fileIdMatch) return url;
    const fileId = fileIdMatch[1];

    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  if (isLoadingUser) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-sm font-medium text-black/60 italic">
              Memuat data user...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-lg font-medium text-black">
              Silakan login terlebih dahulu.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout withNavbar withSidebar>
      <main className=" px-2 py-2 md:px-4 text-black font-sans">
        <div className="mx-auto max-w-[1440px] space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <section className="lg:col-span-2 rounded-md border border-slate-200 p-6 shadow-xs bg-white ">
              <div className="flex flex-col  md:flex-row md:items-start gap-6">
                {/* profile image */}
                <div className="relative h-32 w-32 flex-shrink-0 mx-auto md:mx-0">
                  {user?.profile_picture ? (
                    <Image
                      src={getGoogleDriveImageUrl(user.profile_picture)}
                      alt="Profil"
                      width={128}
                      height={128}
                      className="h-full w-full rounded-md object-cover border border-slate-200"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}

                  <div
                    className={`absolute inset-0 h-full w-full rounded-md bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-black shadow-inner ${
                      user?.profile_picture ? "-z-10" : "z-10"
                    }`}
                  >
                    {(user?.nama?.trim()?.charAt(0) || "U").toUpperCase()}
                  </div>

                  <label className="absolute -bottom-2 -right-2 z-20 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUbahFoto}
                      disabled={isUploadingPhoto}
                    />

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-lg transition-transform ">
                      {isUploadingPhoto ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <UserPen size={14} />
                      )}
                    </div>
                  </label>
                </div>

                {/* content */}
                <div className="flex-1 min-w-0">
                  {/* top section */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="min-w-0">
                      <h1 className="text-xl text-center md:text-start sm:text-4xl font-extrabold tracking-tight text-slate-900 break-words">
                        {user?.nama}
                      </h1>
                    </div>

                    <div
                      data-theme="light"
                      className="w-full sm:w-auto shrink-0"
                    >
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={UserPen}
                        onClick={handleEditProfile}
                        className="w-full sm:w-auto"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* balanced info layout */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-black/60 uppercase tracking-wider min-w-0">
                      <GraduationCap size={16} className="shrink-0" />
                      <span className="truncate">{user?.role}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-black/60 uppercase tracking-wider min-w-0">
                      <Phone size={13} className="shrink-0" />
                      <span className="truncate">
                        {user?.no_telp || "No phone"}
                      </span>
                    </div>

                    {!isDosen && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-black/60 uppercase tracking-wider min-w-0">
                        <BookOpen size={14} className="shrink-0" />
                        <span className="truncate">{user?.jurusan || "-"}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm font-semibold text-black/60 uppercase tracking-wider min-w-0">
                      <Users size={13} className="shrink-0" />
                      <span className="truncate">
                        {user?.no_pengenal || "No ID"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="lg:col-span-1 h-full">
              <div className="rounded-md border border-slate-200 p-6 shadow-xs bg-white h-full flex flex-col items-center justify-center text-center min-h-full">
                <h2 className=" text-xs font-bold uppercase tracking-widest text-black">
                  TOTAL RATING USER
                </h2>

                <div className="mt-4 flex items-end gap-1">
                  <span className="text-5xl font-black text-primary leading-none">
                    4.9
                  </span>

                  <span className="text-base font-bold text-black/40 mb-1">
                    /5
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1 text-primary text-lg leading-none">
                  {"★★★★★"}
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            <aside className="lg:col-span-1 flex flex-col gap-4 h-full">
              {!isDosen && (
                <div className="rounded-md border border-slate-200 p-6 shadow-xs bg-white flex-1">
                  <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-black">
                    Keahlian Utama
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {user?.spesialisasi?.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary border border-primary/10"
                      >
                        {s}
                      </span>
                    )) || (
                      <span className="text-xs text-black/40 italic font-medium">
                        Belum ada data keahlian.
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-md border border-slate-200 p-6 shadow-xs bg-white flex-1">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black">
                    Tim Saat Ini
                  </h2>

                  <Link
                    href="/tim-saya"
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Lihat Semua
                  </Link>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-primary/10 bg-primary/10 hover:bg-blue-200/40 transition-all cursor-pointer group">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-md flex items-center justify-center font-bold text-white shadow-xs bg-white group-hover:scale-105 transition-transform">
                    E
                  </div>

                  <div>
                    <p className="text-sm font-bold">ETC Frontend Core</p>
                    <p className="text-[10px] text-black/40 font-bold uppercase">
                      4 Anggota
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-2 h-full">
              <div className="rounded-md border border-slate-200 p-6 shadow-xs bg-white h-full flex flex-col">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black">
                    Portofolio Proyek
                  </h2>

                  <div
                    data-theme="light"
                    className="flex gap-2 bg-slate-200 p-1 rounded-md"
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      className="px-6 rounded-md"
                    >
                      Semua
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-6 text-black rounded-md"
                    >
                      Selesai
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  <div className="rounded-md border border-slate-200 p-6 group hover:border-primary hover:shadow-xl transition-all cursor-pointer relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={20} className="text-black" />
                    </div>

                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      Campus Lost & Found
                    </h3>

                    <p className="text-xs text-black/60 leading-relaxed mt-2 font-medium">
                      Aplikasi manajemen barang hilang terintegrasi di
                      lingkungan kampus ITS berbasis Web.
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[9px] bg-primary/10 px-2 py-1 rounded font-bold uppercase text-primary border border-primary/10">
                        Next.js
                      </span>

                      <span className="text-[9px] bg-primary/10 px-2 py-1 rounded font-bold uppercase text-primary border border-primary/10">
                        Go
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={handleTambahProyek}
                    className="border-2 border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center p-8 text-black/30 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all cursor-pointer group h-full"
                  >
                    <div className="h-10 w-10 rounded-full  flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-all shadow-xs bg-white">
                      <span className="text-2xl font-light">+</span>
                    </div>

                    <span className="font-bold text-xs tracking-widest uppercase">
                      Tambah Proyek
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={handleCloseAddProject}
        // onSave={handleSaveProject}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        isLoading={updateUser.isPending}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        user={user || null}
      />
    </DashboardLayout>
  );
}

export default dynamic(() => Promise.resolve(ProfileContent), {
  ssr: false,
});

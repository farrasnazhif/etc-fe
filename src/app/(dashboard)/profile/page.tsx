"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import DashboardLayout from "@/layouts/dashboard/dashboard-layout";

import { useAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

import { UserPen, Users, GraduationCap, Phone, BookOpen } from "lucide-react";
import Image from "next/image";
import EditProfileModal from "@/features/profile/edit-profile-modal";
// import AddProjectModal from "@/features/profile/add-project-modal";
import { useMyRekrutmen } from "@/hooks/useMyRekrutmen";
import { useGetAllBookmarks } from "@/hooks/use-bookmark";

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

  // const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleEditProfile = () => setIsEditModalOpen(true);

  const { data: bookmarkList, isPending, isError } = useGetAllBookmarks();

  // const handleCloseAddProject = () => setIsAddProjectModalOpen(false);

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

  const { data: myRekrutmen, isPending: isMyRekrutmenPending } =
    useMyRekrutmen();

  const currentTeams = myRekrutmen?.slice(0, 3) ?? [];

  if (isLoadingUser) {
    return (
      <DashboardLayout withNavbar withSidebar>
        <main className="px-2 py-2 md:px-4">
          <div className="mx-auto max-w-[1440px] animate-pulse space-y-4">
            {/* top profile section */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* profile card */}
              <section className="rounded-md border border-slate-200 bg-white p-6 shadow-xs lg:col-span-2">
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* avatar */}
                  <div className="mx-auto h-32 w-32 rounded-md bg-slate-200 md:mx-0" />

                  {/* profile info */}
                  <div className="flex flex-1 flex-col space-y-5">
                    {/* name + button */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                      <div className="space-y-3">
                        <div className="h-8 w-48 rounded-md bg-slate-200" />
                      </div>

                      <div className="h-9 w-24 rounded-md bg-slate-200" />
                    </div>

                    {/* info grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="h-4 w-32 rounded bg-slate-200" />
                      <div className="h-4 w-36 rounded bg-slate-200" />
                      <div className="h-4 w-40 rounded bg-slate-200" />
                      <div className="h-4 w-28 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              </section>

              {/* spesialisasi */}
              <section className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                <div className="mb-5 h-4 w-24 rounded bg-slate-200" />

                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-8 w-20 rounded-lg bg-slate-200" />
                  ))}
                </div>
              </section>
            </div>

            {/* bottom cards */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* tim saat ini */}
              <section className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-4 w-16 rounded bg-slate-200" />
                </div>

                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md border border-slate-200 p-3"
                    >
                      <div className="h-10 w-10 rounded-md bg-slate-200" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 rounded bg-slate-200" />
                        <div className="h-3 w-20 rounded bg-slate-200" />
                      </div>

                      <div className="h-3 w-24 rounded bg-slate-200" />
                    </div>
                  ))}
                </div>
              </section>

              {/* bookmark */}
              <section className="rounded-md border border-slate-200 bg-white p-6 shadow-xs">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-4 w-16 rounded bg-slate-200" />
                </div>

                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md border border-slate-200 p-3"
                    >
                      <div className="h-10 w-10 rounded-md bg-slate-200" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 rounded bg-slate-200" />
                        <div className="h-3 w-20 rounded bg-slate-200" />
                      </div>

                      <div className="h-3 w-24 rounded bg-slate-200" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
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
            <section className="lg:col-span-2 rounded-md border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                {/* profile image */}
                <div className="relative mx-auto h-32 w-32 flex-shrink-0 md:mx-0">
                  {user?.profile_picture ? (
                    <Image
                      src={getGoogleDriveImageUrl(user.profile_picture)}
                      alt="Profil"
                      width={128}
                      height={128}
                      className="h-full w-full rounded-md border border-slate-200 object-cover"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}

                  {/* fallback avatar */}
                  <div
                    className={`absolute inset-0 flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br from-blue-400 to-indigo-500 text-4xl font-black text-white shadow-inner ${
                      user?.profile_picture ? "-z-10" : "z-10"
                    }`}
                  >
                    {(user?.nama?.trim()?.charAt(0) || "U").toUpperCase()}
                  </div>

                  {/* upload button */}
                  <label className="absolute -bottom-2 -right-2 z-20 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUbahFoto}
                      disabled={isUploadingPhoto}
                    />

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-lg">
                      {isUploadingPhoto ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <UserPen size={14} />
                      )}
                    </div>
                  </label>
                </div>

                {/* content */}
                <div className="flex min-w-0 flex-1 flex-col">
                  {/* top section */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h1 className="break-words text-center text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl md:text-left">
                        {user?.nama || "Unnamed User"}
                      </h1>
                    </div>

                    <div
                      data-theme="light"
                      className="w-full shrink-0 sm:w-auto"
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
                  <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-3 sm:grid-cols-2">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black/60">
                      <GraduationCap size={16} className="shrink-0" />

                      <span className="truncate">{user?.role || "-"}</span>
                    </div>

                    <div className="flex min-w-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black/60">
                      <Phone size={13} className="shrink-0" />

                      <span className="truncate">
                        {user?.no_telp || "No phone"}
                      </span>
                    </div>

                    {!isDosen && (
                      <div className="flex min-w-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black/60">
                        <BookOpen size={14} className="shrink-0" />

                        <span className="truncate">{user?.jurusan || "-"}</span>
                      </div>
                    )}

                    <div className="flex min-w-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-black/60">
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
              {!isDosen && (
                <div className="rounded-md border border-slate-200 p-6 shadow-xs bg-white flex-1 h-full">
                  <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-black">
                    SPESIALISASI
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
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            <aside className="lg:col-span-1 flex flex-col gap-4 h-full">
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

                {isMyRekrutmenPending ? (
                  <div className="animate-pulse space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-md border border-slate-200 p-3"
                      >
                        <div className="h-10 w-10 rounded-md bg-slate-200" />

                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-24 rounded bg-slate-200" />

                          <div className="h-3 w-20 rounded bg-slate-200" />
                        </div>

                        <div className="h-3 w-24 rounded bg-slate-200" />
                      </div>
                    ))}
                  </div>
                ) : currentTeams.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 text-center">
                    <p className="text-sm font-medium text-black/50">
                      Belum memiliki tim aktif
                    </p>

                    <p className="mt-1 text-xs text-black/30">
                      Mulai buat atau gabung tim baru.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    {currentTeams.map((team) => {
                      const formatShortDate = (date: string) => {
                        const d = new Date(date);

                        const day = String(d.getDate()).padStart(2, "0");
                        const month = String(d.getMonth() + 1).padStart(2, "0");
                        const year = String(d.getFullYear()).slice(-2);

                        return `${day}/${month}/${year}`;
                      };

                      return (
                        <Link
                          key={team.rekrutmen_id}
                          href={`/tim-saya/${team.rekrutmen_id}`}
                        >
                          <div className="flex items-center gap-3 rounded-md border border-primary/10 bg-primary/10 p-3 transition-all cursor-pointer group hover:bg-blue-200/40">
                            {/* icon */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-400 to-indigo-500 font-bold text-white shadow-xs">
                              {team.kegiatan?.charAt(0).toUpperCase() || "T"}
                            </div>

                            {/* content */}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold">
                                {team.kegiatan || "Tim Aktif"}
                              </p>

                              <p className="truncate text-[10px] font-bold uppercase text-black/40">
                                {team.role || "Tanpa Role"}
                              </p>
                            </div>

                            <div className="grid grid-rows-2">
                              <p className="grid-rows-2 truncate text-[10px] text-black/50 font-medium mt-1">
                                {formatShortDate(team.tanggal_mulai)} -{" "}
                                {formatShortDate(team.tanggal_selesai)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>

            <div className="rounded-md border border-slate-200 p-6 shadow-xs bg-white flex-1">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-black">
                  Bookmark Saya
                </h2>

                <Link
                  href="/bookmark"
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  Lihat Semua
                </Link>
              </div>

              {isPending ? (
                <div className="animate-pulse space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md border border-slate-200 p-3"
                    >
                      <div className="h-10 w-10 rounded-md bg-slate-200" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 rounded bg-slate-200" />

                        <div className="h-3 w-20 rounded bg-slate-200" />
                      </div>

                      <div className="h-3 w-24 rounded bg-slate-200" />
                    </div>
                  ))}
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-red-200 py-8 text-center">
                  <p className="text-sm font-medium text-red-500">
                    Gagal memuat bookmark
                  </p>

                  <p className="mt-1 text-xs text-black/30">
                    Coba refresh halaman kembali.
                  </p>
                </div>
              ) : !bookmarkList || bookmarkList.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 text-center">
                  <p className="text-sm font-medium text-black/50">
                    Belum memiliki bookmark
                  </p>

                  <p className="mt-1 text-xs text-black/30">
                    Mulai bookmark rekrutmen baru.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  {bookmarkList.slice(0, 3).map((bookmark) => {
                    const formatShortDate = (date: string) => {
                      const d = new Date(date);

                      const day = String(d.getDate()).padStart(2, "0");
                      const month = String(d.getMonth() + 1).padStart(2, "0");
                      const year = String(d.getFullYear()).slice(-2);

                      return `${day}/${month}/${year}`;
                    };

                    return (
                      <Link
                        key={bookmark.id}
                        href={`/feed/${bookmark.rekrutmen_id}`}
                      >
                        <div className="flex items-center gap-3 rounded-md border border-primary/10 bg-primary/10 p-3 transition-all cursor-pointer group hover:bg-blue-200/40">
                          {/* icon */}

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-400 to-indigo-500 font-bold text-white shadow-xs">
                            {(
                              bookmark.rekrutmen.kegiatan?.charAt(0) || "B"
                            ).toUpperCase()}
                          </div>

                          {/* content */}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">
                              {bookmark.rekrutmen.kegiatan || "Bookmark"}
                            </p>

                            <p className="truncate text-[10px] font-bold uppercase text-black/40">
                              {bookmark.rekrutmen.role || "Tanpa Role"}
                            </p>
                          </div>

                          <div className="grid grid-rows-2">
                            <p className="truncate text-[10px] text-black/50 font-medium mt-1 grid-rows-2">
                              {formatShortDate(
                                bookmark.rekrutmen.tanggal_mulai,
                              )}{" "}
                              -{" "}
                              {formatShortDate(
                                bookmark.rekrutmen.tanggal_selesai,
                              )}
                            </p>
                          </div>

                          {/* <ExternalLink
                            size={14}
                            className="shrink-0 text-black/30 transition group-hover:text-primary"
                          /> */}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* <div className="lg:col-span-2 h-full">
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
            </div> */}
          </div>
        </div>
      </main>

      {/* <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={handleCloseAddProject}
        // onSave={handleSaveProject}
      /> */}

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

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 pt-30 text-gray-600 md:px-16 lg:px-24">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:gap-16">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              alt="ETC logo"
              className="h-7.5 w-auto"
              width={205}
              height={48}
            />
          </Link>
          <p className="mt-6 max-w-sm text-sm/6">
            ETC adalah platform untuk menemukan tim, mencari partner dengan visi
            yang sama, dan memulai kolaborasi dari awal. Mulai dari lomba,
            proyek kampus, hingga side project, semuanya bisa dimulai di sini.
          </p>
        </div>

        <div className="flex flex-col items-start justify-around gap-8 md:flex-1 md:flex-row md:gap-20">
          <div className="flex flex-col">
            <h2 className="mb-5 font-semibold text-gray-800">Explore</h2>
            <Link
              href="/"
              className="py-1.5 transition duration-200 hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="py-1.5 transition duration-200 hover:text-black"
            >
              Cari Tim
            </Link>
            <Link
              href="/create-team"
              className="py-1.5 transition duration-200 hover:text-black"
            >
              Buat Tim
            </Link>
            <Link
              href="/profile"
              className="py-1.5 transition duration-200 hover:text-black"
            >
              Profil Saya
            </Link>
          </div>

          <div>
            <h2 className="mb-5 font-semibold text-gray-800">
              Stay in the loop
            </h2>
            <div className="max-w-xs space-y-6 text-sm">
              <p>
                Dapatkan informasi terbaru seputar lomba, peluang kolaborasi,
                dan update fitur ETC langsung ke email kamu.
              </p>
              <form className="flex items-center justify-center gap-2 rounded-md bg-gray-100 p-1.5">
                <input
                  className="w-full max-w-64 rounded px-2 py-2 outline-none"
                  type="email"
                  placeholder="Email kamu..."
                  required
                />
                <button className="rounded bg-gray-800 px-4 py-2 text-white transition hover:opacity-90">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-4 md:flex-row">
        <p className="text-center">© {new Date().getFullYear()} ETC</p>

        <div className="flex items-center gap-6">
          <Link
            href="/privacy-policy"
            className="transition duration-200 hover:text-black"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="transition duration-200 hover:text-black"
          >
            Terms of Service
          </Link>
          <Link
            href="/cookie-policy"
            className="transition duration-200 hover:text-black"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

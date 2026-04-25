export default function DashboardFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-white px-4 md:px-6 py-4 text-xs md:text-sm text-gray-500">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* left */}
        <p className="text-center md:text-left">
          © {year} ETC Collaborative. All rights reserved.
        </p>

        {/* right */}
        <div className="flex justify-center gap-4 md:gap-6">
          <a href="#" className="hover:text-black transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black transition">
            Terms & Activity
          </a>
        </div>
      </div>
    </footer>
  );
}

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 py-2 text-center font-medium text-white">
      <p>Templates are live on PrebuiltUI!</p>
      <Link
        href="https://prebuiltui.com"
        className="ml-3 flex items-center gap-1 rounded-md bg-white px-3 py-1 text-xs text-blue-600 transition hover:bg-slate-200 active:scale-95"
      >
        Check it out
        <ArrowRightIcon className="size-3.5" />
      </Link>
    </div>
  );
}

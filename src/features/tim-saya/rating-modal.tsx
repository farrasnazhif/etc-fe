"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RemoveScroll } from "react-remove-scroll";

interface RatingMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  isLoading?: boolean;
  onSubmit: (data: { rating: number; deskripsi: string }) => void;
}

export default function RatingMemberModal({
  isOpen,
  onClose,
  memberName,
  isLoading,
  onSubmit,
}: RatingMemberModalProps) {
  const [rating, setRating] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (isLoading) return;

    setRating(0);
    setDeskripsi("");
    onClose();
  };

  const handleSubmit = () => {
    if (!rating || !deskripsi.trim()) return;

    onSubmit({
      rating,
      deskripsi,
    });
  };

  if (!isOpen) return null;

  return (
    <RemoveScroll enabled={isOpen}>
      <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={handleClose}
        />

        {/* modal */}
        <div className="relative z-10 w-full max-w-lg rounded-md border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Beri Rating untuk {memberName}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Berikan evaluasi performa anggota tim
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* body */}
          <div className="space-y-6 px-6 py-5">
            {/* rating */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-800">Rating</p>

              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="cursor-pointer rounded-md p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      strokeWidth={1.25}
                      className={cn(
                        "size-8 transition-colors",
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* deskripsi */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-800">
                Deskripsi Penilaian
              </p>

              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows={5}
                placeholder="Contoh: cukup inisiatif, komunikasi baik, namun perlu lebih aktif..."
                className="w-full resize-none rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary"
              />

              <div className="flex justify-between text-xs text-slate-400">
                <span>Tulis evaluasi yang jelas dan konstruktif</span>
                <span>{deskripsi.length} karakter</span>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
            <div data-theme="light">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
            </div>

            <div data-theme="light">
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!rating || !deskripsi.trim()}
                isLoading={isLoading}
                className="w-full sm:w-auto"
              >
                Kirim Rating
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
}

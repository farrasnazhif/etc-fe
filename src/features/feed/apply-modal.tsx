"use client";

import { useState } from "react";
import { Loader2, X, Upload } from "lucide-react";
import Button from "@/components/ui/button";
import { useApplyRekrutmen } from "@/hooks/useApplyRekrutmen";

export type ApplyModalProps = {
  rekrutmenId: string;
  roleLabel: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ApplyModal({ rekrutmenId, roleLabel, isOpen, onClose }: ApplyModalProps) {
  const [fileCV, setFileCV] = useState<File | null>(null);
  const [filePortfolio, setFilePortfolio] = useState<File | null>(null);
  const [alasan, setAlasan] = useState("");
  
  const { apply, isLoading, isSuccess, isError, error } = useApplyRekrutmen(rekrutmenId);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileCV || !alasan) return;
    
    apply(
      { fileCV, filePortfolio, alasan },
      {
        onSuccess: () => {
          setTimeout(() => {
            onClose();
          }, 1500);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Daftar sebagai {roleLabel}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground cursor-pointer" disabled={isLoading}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Berhasil Mendaftar!</h3>
            <p className="text-sm text-muted-foreground">Aplikasi Anda telah berhasil dikirim.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Upload CV (PDF) <span className="text-destructive">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <Upload className="w-5 h-5 text-muted-foreground mb-2" />
                    {fileCV ? (
                      <p className="text-sm text-primary font-medium truncate max-w-[200px]">{fileCV.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground font-medium">Klik untuk upload CV</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileCV(e.target.files[0]);
                      }
                    }}
                    required
                    disabled={isLoading}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Upload Portfolio (PDF) <span className="text-muted-foreground font-normal text-xs">(opsional)</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <Upload className="w-5 h-5 text-muted-foreground mb-2" />
                    {filePortfolio ? (
                      <p className="text-sm text-primary font-medium truncate max-w-[200px]">{filePortfolio.name}</p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground font-medium">Klik untuk upload Portfolio</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFilePortfolio(e.target.files[0]);
                      }
                    }}
                    disabled={isLoading}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Alasan Mendaftar <span className="text-destructive">*</span>
              </label>
              <textarea
                value={alasan}
                onChange={(e) => setAlasan(e.target.value)}
                placeholder="Ceritakan alasan kamu mendaftar..."
                rows={3}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary min-h-[80px]"
                required
                disabled={isLoading}
              />
            </div>

            {isError && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20">
                {error instanceof Error ? error.message : "Terjadi kesalahan saat mendaftar"}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full cursor-pointer"
              disabled={isLoading || !fileCV || !alasan}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Lamaran"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

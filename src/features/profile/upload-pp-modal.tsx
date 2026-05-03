"use client";

import { useState } from "react";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { RemoveScroll } from "react-remove-scroll";

type UploadProfilePictureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (profilePictureUrl: string) => Promise<void> | void;
  isLoading?: boolean;
};

export default function UploadProfilePictureModal({
  isOpen,
  onClose,
  onUpload,
  isLoading = false,
}: UploadProfilePictureModalProps) {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!profilePictureUrl.trim()) return;

    await onUpload(profilePictureUrl.trim());
  };

  return (
    <RemoveScroll enabled={isOpen}>
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full max-w-lg rounded-md border border-slate-200 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900">
              Upload Profile Picture
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Masukkan URL foto profil baru Anda untuk menambahkan foto profil.
            </p>
          </div>

          {/* body */}
          <div data-theme="light" className="px-6 py-6">
            <Input
              label="Profile Picture URL"
              placeholder="https://drive.google.com/file/d/..."
              value={profilePictureUrl}
              onChange={(e) => setProfilePictureUrl(e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* footer */}
          <div
            data-theme="light"
            className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4"
          >
            <Button variant="error" onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleUpload}
              isLoading={isLoading}
              disabled={!profilePictureUrl.trim()}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
}

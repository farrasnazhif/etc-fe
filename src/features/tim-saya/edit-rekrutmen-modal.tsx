"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/text-area";
import Select from "@/components/ui/select";
import { X } from "lucide-react";
import {
  useUpdateDeleteRekrutmen,
  UpdateRekrutmenInput,
} from "@/hooks/useUpdateDeleteRekrutmen";
import { useToast } from "@/components/ui/toaster";

type EditRekrutmenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  rekrutmenId: string;
  defaultValues: UpdateRekrutmenInput;
};

export default function EditRekrutmenModal({
  isOpen,
  onClose,
  rekrutmenId,
  defaultValues,
}: EditRekrutmenModalProps) {
  const { update, isUpdating } = useUpdateDeleteRekrutmen(rekrutmenId);
  const { addToast } = useToast();

  const [formData, setFormData] = useState<UpdateRekrutmenInput>(defaultValues);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: UpdateRekrutmenInput) => ({
      ...prev,
      [name]: name === "fee" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    update(formData, {
      onSuccess: () => {
        addToast("Rekrutmen berhasil diperbarui!", "success");
        onClose();
      },
      onError: (err: unknown) => {
        addToast(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat menyimpan data",
          "error",
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold text-primary">Edit Rekrutmen</h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-full p-2 h-auto text-muted-foreground hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4 max-h-[80vh] overflow-y-auto"
        >
          <Select
            label="Kegiatan"
            name="kegiatan"
            value={formData.kegiatan}
            onChange={handleChange}
            options={[
              { label: "Projek", value: "projek" },
              { label: "Lomba", value: "lomba" },
              { label: "Riset", value: "riset" },
            ]}
            required
            className="w-full max-w-full bg-secondary "
          />

          <Input
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full bg-secondary "
          />

          <TextArea
            label="Kriteria"
            name="Kriteria"
            value={formData.Kriteria}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-secondary"
          />

          <Input
            label="Fee"
            name="fee"
            type="number"
            value={formData.fee}
            onChange={handleChange}
            required
            className="w-full bg-secondary"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tanggal Mulai"
              name="tanggal_mulai"
              type="date"
              value={formData.tanggal_mulai.split("T")[0]}
              onChange={handleChange}
              required
              className="max-w-full bg-secondary"
            />
            <Input
              label="Tanggal Selesai"
              name="tanggal_selesai"
              type="date"
              value={formData.tanggal_selesai.split("T")[0]}
              onChange={handleChange}
              required
              className="max-w-full bg-secondary"
            />
          </div>

          <Input
            label="Contact Person"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            required
            className="w-full bg-secondary"
          />

          <div data-theme="light" className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isUpdating}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isUpdating}
              isLoading={isUpdating}
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

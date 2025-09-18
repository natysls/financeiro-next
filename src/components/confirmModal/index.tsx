"use client";
import { ReactNode } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: Readonly<ConfirmModalProps>) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/80">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

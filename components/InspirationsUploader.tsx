'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  inspirations: string[];
  onAdd: (dataUrl: string) => void;
  onRemove: (index: number) => void;
  onReorder: (from: number, to: number) => void;
};

export default function InspirationsUploader({ inspirations, onAdd, onRemove, onReorder }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.slice(0, Math.max(0, 10 - inspirations.length)).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => onAdd(reader.result as string);
        reader.readAsDataURL(file);
      });
    },
    [inspirations.length, onAdd]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 10
  });

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Inspirations ({inspirations.length}/10)</h3>
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border border-dashed border-black/30 p-4 text-center text-sm hover:border-champagne"
      >
        <input {...getInputProps()} />
        {isDragActive ? 'Drop your inspiration files' : 'Drag and drop inspirations or click to upload'}
      </div>
      <ul className="space-y-2">
        {inspirations.map((src, index) => (
          <li key={`${src.slice(0, 20)}-${index}`} className="flex items-center gap-2 rounded border border-black/10 p-2">
            <Image src={src} alt={`Inspiration ${index + 1}`} width={40} height={40} className="h-10 w-10 rounded object-cover" />
            <span className="text-xs">Inspiration {index + 1}</span>
            <div className="ml-auto flex gap-1">
              <button type="button" onClick={() => onReorder(index, index - 1)} className="rounded border px-2 py-1 text-xs">
                ↑
              </button>
              <button type="button" onClick={() => onReorder(index, index + 1)} className="rounded border px-2 py-1 text-xs">
                ↓
              </button>
              <button type="button" onClick={() => onRemove(index)} className="rounded border px-2 py-1 text-xs text-red-700">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

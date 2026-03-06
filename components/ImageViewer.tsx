'use client';

import Image from 'next/image';
import type { OutputImage } from '@/store/sessionStore';

export default function ImageViewer({
  selected,
  onRedo,
  onFavorite,
  onSave,
  onDownload
}: {
  selected: OutputImage | null;
  onRedo: () => void;
  onFavorite: (id: string) => void;
  onSave: (id: string) => void;
  onDownload: (item: OutputImage) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Viewer</h2>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-black/10 bg-white">
        {selected ? (
          <Image src={selected.url} alt="Selected output" fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-black/60">No output selected yet.</div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onRedo} className="rounded bg-black px-3 py-2 text-sm text-white">
          Redo
        </button>
        <button
          type="button"
          disabled={!selected}
          onClick={() => selected && onSave(selected.id)}
          className="rounded border px-3 py-2 text-sm"
        >
          Save
        </button>
        <button
          type="button"
          disabled={!selected}
          onClick={() => selected && onFavorite(selected.id)}
          className="rounded border px-3 py-2 text-sm"
        >
          Favorite
        </button>
        <button
          type="button"
          disabled={!selected}
          onClick={() => selected && onDownload(selected)}
          className="rounded border px-3 py-2 text-sm"
        >
          Download
        </button>
      </div>
    </div>
  );
}

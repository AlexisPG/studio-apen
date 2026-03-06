'use client';

import Image from 'next/image';
import type { OutputImage } from '@/store/sessionStore';

export default function OutputThumbnail({
  output,
  active,
  onSelect,
  onFavorite,
  onSave,
  onDownload
}: {
  output: OutputImage;
  active: boolean;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
  onSave: (id: string) => void;
  onDownload: (item: OutputImage) => void;
}) {
  return (
    <article className={`rounded border p-2 ${active ? 'border-champagne' : 'border-black/10'}`}>
      <button type="button" onClick={() => onSelect(output.id)} className="relative block aspect-square w-full overflow-hidden rounded">
        <Image src={output.url} alt="Output thumbnail" fill className="object-cover" />
      </button>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span>Status: {output.status}</span>
        <div className="flex gap-1">
          <button type="button" onClick={() => onFavorite(output.id)} className="rounded border px-1.5 py-0.5">
            {output.isFavorited ? '★' : '☆'}
          </button>
          <button type="button" onClick={() => onSave(output.id)} className="rounded border px-1.5 py-0.5">
            {output.isSaved ? 'Saved' : 'Save'}
          </button>
          <button type="button" onClick={() => onDownload(output)} className="rounded border px-1.5 py-0.5">
            ↓
          </button>
        </div>
      </div>
    </article>
  );
}

'use client';

import type { OutputImage } from '@/store/sessionStore';
import OutputThumbnail from './OutputThumbnail';

export default function ImageGallery({
  outputs,
  selectedId,
  onSelect,
  onFavorite,
  onSave,
  onDownload
}: {
  outputs: OutputImage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
  onSave: (id: string) => void;
  onDownload: (item: OutputImage) => void;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-serif text-2xl">Outputs</h2>
      <div className="grid gap-3">
        {outputs.length === 0 ? (
          <p className="text-sm text-black/60">Generated outputs will appear here.</p>
        ) : (
          outputs.map((output) => (
            <OutputThumbnail
              key={output.id}
              output={output}
              active={selectedId === output.id}
              onSelect={onSelect}
              onFavorite={onFavorite}
              onSave={onSave}
              onDownload={onDownload}
            />
          ))
        )}
      </div>
    </div>
  );
}

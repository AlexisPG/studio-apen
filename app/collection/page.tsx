'use client';

import Image from 'next/image';
import { useSessionStore } from '@/store/sessionStore';

export default function CollectionPage() {
  const collection = useSessionStore((state) => state.outputs.filter((output) => output.isSaved));

  return (
    <div className="mx-auto max-w-[1200px] space-y-4">
      <h2 className="font-serif text-3xl">Collection</h2>
      {collection.length === 0 ? (
        <p className="text-sm">No saved outputs yet. Save outputs from Workshop.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collection.map((output) => (
            <div key={output.id} className="rounded border border-black/10 p-2">
              <div className="relative aspect-square overflow-hidden rounded">
                <Image src={output.url} alt="Saved output" fill className="object-cover" />
              </div>
              <p className="mt-2 text-xs">{output.prompt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

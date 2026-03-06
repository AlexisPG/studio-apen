'use client';

import { useMemo, useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';

type PromptItem = {
  title: string;
  text: string;
};

const promptsByCategory: Record<'Signature' | 'Event' | 'Infinite', PromptItem[]> = {
  Signature: [
    {
      title: 'Timeless Elegance',
      text: 'A timeless high jewelry piece featuring clean lines and refined craftsmanship.'
    },
    {
      title: 'Heritage Collection',
      text: 'Classic heritage inspired jewelry with intricate metalwork and precious stones.'
    },
    {
      title: 'Modern Luxury',
      text: 'Contemporary luxury jewelry with bold geometric forms and refined finishes.'
    }
  ],
  Event: [
    {
      title: 'Gala Night',
      text: 'A dramatic high jewelry piece designed for evening galas, with strong brilliance and elegant composition.'
    }
  ],
  Infinite: [
    {
      title: 'Minimal Diamond',
      text: 'A minimal diamond composition in white metal with soft studio lighting.'
    }
  ]
};

const categoryOrder: Array<keyof typeof promptsByCategory> = ['Signature', 'Event', 'Infinite'];

export default function PromptLibraryPanel() {
  const isOpen = useSessionStore((state) => state.isPromptLibraryOpen);
  const closePromptLibrary = useSessionStore((state) => state.closePromptLibrary);
  const setPromptText = useSessionStore((state) => state.setPromptText);
  const [search, setSearch] = useState('');

  const loweredSearch = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    return categoryOrder
      .map((category) => {
        const items = promptsByCategory[category].filter((item) => {
          if (!loweredSearch) return true;
          return `${item.title} ${item.text}`.toLowerCase().includes(loweredSearch);
        });

        return { category, items };
      })
      .filter((group) => group.items.length > 0);
  }, [loweredSearch]);

  const handlePickPrompt = (text: string) => {
    setPromptText(text);
    closePromptLibrary();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closePromptLibrary}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform border-l border-black/10 bg-[#f6f2e9] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.14)] transition-transform duration-300 sm:rounded-l-[10px] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Prompt Library</h2>
          <button type="button" onClick={closePromptLibrary} className="rounded border border-black/20 px-2 py-1 text-sm">
            Close
          </button>
        </div>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search prompts"
          className="mt-4 w-full rounded-md border border-black/20 bg-white/70 px-3 py-2 text-sm outline-none focus:border-champagne"
        />

        <div className="mt-5 space-y-5 overflow-y-auto pb-10">
          {filtered.length === 0 ? (
            <p className="text-sm text-black/60">No prompts found.</p>
          ) : (
            filtered.map(({ category, items }) => (
              <section key={category}>
                <h3 className="mb-2 font-serif text-xl">{category}</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handlePickPrompt(item.text)}
                      className="w-full rounded-[10px] border border-black/10 bg-white/70 p-3 text-left shadow-sm transition hover:border-champagne"
                    >
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs text-black/75">"{item.text}"</p>
                    </button>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </aside>
    </>
  );
}

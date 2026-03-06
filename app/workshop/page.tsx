'use client';

import InspirationsUploader from '@/components/InspirationsUploader';
import PromptEditor from '@/components/PromptEditor';
import PromptPreview from '@/components/PromptPreview';
import TierLevelSelector from '@/components/TierLevelSelector';
import WorkshopLayout from '@/components/WorkshopLayout';
import ImageViewer from '@/components/ImageViewer';
import ImageGallery from '@/components/ImageGallery';
import { buildPrompt } from '@/lib/promptBuilder';
import { mockGenerate } from '@/lib/mockGenerator';
import { exportReadyOutputsZip } from '@/lib/zipExport';
import { useSessionStore, type OutputImage } from '@/store/sessionStore';

function downloadOutput(item: OutputImage): void {
  const link = document.createElement('a');
  link.href = item.url;
  link.download = `${item.id}.svg`;
  link.click();
}

export default function WorkshopPage() {
  const {
    inspirations,
    tier,
    level,
    promptText,
    outputs,
    selectedOutputId,
    setTier,
    setLevel,
    setPromptText,
    addInspiration,
    removeInspiration,
    reorderInspiration,
    addOutputs,
    selectOutput,
    toggleFavorite,
    toggleSaved
  } = useSessionStore();

  const selected = outputs.find((output) => output.id === selectedOutputId) ?? null;
  const compiledPrompt = buildPrompt(promptText, tier, level, inspirations.length);

  const handleGenerate = () => {
    const generated = mockGenerate(compiledPrompt, tier, level);
    addOutputs(generated);
  };

  const leftColumn = (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Configuration</h2>
      <InspirationsUploader
        inspirations={inspirations}
        onAdd={addInspiration}
        onRemove={removeInspiration}
        onReorder={reorderInspiration}
      />
      <TierLevelSelector tier={tier} level={level} onTierChange={setTier} onLevelChange={setLevel} />
      <PromptEditor prompt={promptText} onChange={setPromptText} />
      <PromptPreview prompt={compiledPrompt} />
      <button
        type="button"
        onClick={handleGenerate}
        className="w-full rounded bg-champagne px-4 py-3 text-sm font-semibold text-black"
      >
        Generate
      </button>
      <button type="button" onClick={() => exportReadyOutputsZip(outputs)} className="w-full rounded border px-4 py-3 text-sm">
        Export READY as ZIP
      </button>
    </div>
  );

  return (
    <WorkshopLayout
      left={leftColumn}
      center={
        <ImageViewer
          selected={selected}
          onRedo={handleGenerate}
          onFavorite={toggleFavorite}
          onSave={toggleSaved}
          onDownload={downloadOutput}
        />
      }
      right={
        <ImageGallery
          outputs={outputs}
          selectedId={selectedOutputId}
          onSelect={selectOutput}
          onFavorite={toggleFavorite}
          onSave={toggleSaved}
          onDownload={downloadOutput}
        />
      }
    />
  );
}

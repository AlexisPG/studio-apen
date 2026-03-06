export default function PromptPreview({ prompt }: { prompt: string }) {
  return (
    <div className="rounded border border-black/10 bg-black/[0.02] p-3 text-sm">
      <p className="mb-1 font-semibold">Prompt Preview</p>
      <p className="text-xs leading-relaxed">{prompt}</p>
    </div>
  );
}

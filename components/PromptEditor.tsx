'use client';

export default function PromptEditor({
  prompt,
  onChange
}: {
  prompt: string;
  onChange: (prompt: string) => void;
}) {
  return (
    <label className="block text-sm">
      Prompt
      <textarea
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe your high jewelry concept..."
        className="mt-1 h-36 w-full rounded border p-3"
      />
    </label>
  );
}

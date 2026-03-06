import JSZip from 'jszip';
import type { OutputImage } from '@/store/sessionStore';

function dataUriToBlob(dataUri: string): Blob {
  const [meta, body] = dataUri.split(',');
  const mime = meta.match(/data:(.*?);/)?.[1] ?? 'image/svg+xml';
  const decoded = decodeURIComponent(body);
  return new Blob([decoded], { type: mime });
}

export async function exportReadyOutputsZip(outputs: OutputImage[]): Promise<void> {
  const ready = outputs.filter((output) => output.status === 'READY');
  const zip = new JSZip();

  ready.forEach((output, index) => {
    const fileBlob = dataUriToBlob(output.url);
    zip.file(`output-${index + 1}.svg`, fileBlob);
  });

  const manifest = ready.map((output) => ({
    id: output.id,
    status: output.status,
    prompt: output.prompt,
    tier: output.tier,
    level: output.level,
    favorited: output.isFavorited,
    saved: output.isSaved,
    createdAt: output.createdAt
  }));

  zip.file('manifest.json', JSON.stringify(manifest, null, 2));

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'studio-apen-outputs.zip';
  link.click();
  URL.revokeObjectURL(url);
}

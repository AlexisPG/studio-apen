import type { Level, OutputImage, Tier } from '@/store/sessionStore';

function makeSvgDataUrl(label: string, sublabel: string, accent: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#f2ede2'/><stop offset='1' stop-color='${accent}'/></linearGradient></defs>
  <rect width='1200' height='1200' fill='url(#g)'/>
  <circle cx='600' cy='560' r='220' fill='none' stroke='#2d2d2d' stroke-width='10'/>
  <text x='600' y='990' text-anchor='middle' font-size='46' font-family='Inter, sans-serif' fill='#2d2d2d'>${label}</text>
  <text x='600' y='1060' text-anchor='middle' font-size='32' font-family='Inter, sans-serif' fill='#2d2d2d'>${sublabel}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function mockGenerate(prompt: string, tier: Tier, level: Level): OutputImage[] {
  const stamp = Date.now();
  return [0, 1].map((index) => ({
    id: `${stamp}-${index}`,
    url: makeSvgDataUrl(`Studio Apen Output ${index + 1}`, `${tier} / ${level}`, index === 0 ? '#dcc79c' : '#c8a96b'),
    status: 'READY',
    prompt,
    tier,
    level,
    isFavorited: false,
    isSaved: false,
    createdAt: new Date().toISOString()
  }));
}

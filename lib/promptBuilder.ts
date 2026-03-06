import type { Level, Tier } from '@/store/sessionStore';

export function buildPrompt(basePrompt: string, tier: Tier, level: Level, inspirationsCount: number): string {
  const cleaned = basePrompt.trim() || 'High jewelry editorial concept';
  return `${cleaned} | Tier ${tier} | Level ${level} | Inspirations: ${inspirationsCount}`;
}

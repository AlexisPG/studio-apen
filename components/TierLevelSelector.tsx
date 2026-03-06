'use client';

import type { Level, Tier } from '@/store/sessionStore';

export default function TierLevelSelector({
  tier,
  level,
  onTierChange,
  onLevelChange
}: {
  tier: Tier;
  level: Level;
  onTierChange: (tier: Tier) => void;
  onLevelChange: (level: Level) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <label className="text-sm">
        Tier
        <select value={tier} onChange={(e) => onTierChange(e.target.value as Tier)} className="mt-1 w-full rounded border p-2">
          {['A', 'B', 'C', 'D'].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        Level
        <select value={level} onChange={(e) => onLevelChange(e.target.value as Level)} className="mt-1 w-full rounded border p-2">
          {['L1', 'L2', 'L3', 'L4'].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

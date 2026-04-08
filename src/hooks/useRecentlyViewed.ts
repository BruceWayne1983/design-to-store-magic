import { useEffect, useState } from "react";

const STORAGE_KEY = "baseline_recently_viewed";
const MAX_ITEMS = 8;

export function useRecentlyViewed(currentSlug: string) {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const updated = [currentSlug, ...stored.filter((s) => s !== currentSlug)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setRecentSlugs(updated.filter((s) => s !== currentSlug));
    } catch {
      setRecentSlugs([]);
    }
  }, [currentSlug]);

  return recentSlugs;
}

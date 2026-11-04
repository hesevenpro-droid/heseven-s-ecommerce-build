// Media served via Lovable Assets lives at /__l5e/assets-v1/... on Lovable's
// hosting only. When the app runs on any other host (e.g. a self-hosted copy),
// resolve asset URLs against the canonical published origin so images and
// videos load everywhere.
const PUBLISHED_ORIGIN = "https://heseven-growth-hub.lovable.app";

export function assetUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${PUBLISHED_ORIGIN}${url}`;
}

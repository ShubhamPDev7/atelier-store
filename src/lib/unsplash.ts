export function unsplash(id: string, width = 1600): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Zoomed 4:5 crop of an Unsplash photo around a focal point (0–1). */
export function unsplashDetail(id: string, x = 0.5, y = 0.5, zoom = 2): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&w=1200&h=1500&q=80`;
}

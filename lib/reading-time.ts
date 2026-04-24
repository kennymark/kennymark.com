const DEFAULT_WORDS_PER_MINUTE = 225;

export function calculateReadingTime(
  content: string,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE,
): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  if (words === 0) return 1;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

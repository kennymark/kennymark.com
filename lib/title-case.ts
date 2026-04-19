const SMALL_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'for',
  'if',
  'in',
  'nor',
  'of',
  'on',
  'or',
  'so',
  'the',
  'to',
  'up',
  'vs',
  'via',
  'yet',
]);

function capitalizeToken(token: string) {
  if (token.length === 0) return token;
  // Preserve tokens that already contain an uppercase letter beyond the first
  // character (acronyms/brand casing like "JS", "tRPC", "iOS").
  if (/[A-Z]/.test(token.slice(1))) return token;
  return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
}

function titleCaseWord(word: string, isEdge: boolean) {
  // Split on hyphens so each segment gets capitalized (e.g. "E-commerce" -> "E-Commerce").
  return word
    .split('-')
    .map((segment, i, arr) => {
      const segmentIsEdge = isEdge && (i === 0 || i === arr.length - 1);
      if (!segmentIsEdge && SMALL_WORDS.has(segment.toLowerCase())) {
        return segment.toLowerCase();
      }
      return capitalizeToken(segment);
    })
    .join('-');
}

export function titleCase(input: string): string {
  if (!input) return '';
  const words = input.trim().split(/\s+/);
  return words.map((word, i) => titleCaseWord(word, i === 0 || i === words.length - 1)).join(' ');
}

export default titleCase;

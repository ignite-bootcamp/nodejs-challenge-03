export function filterTruthyValues<T extends Record<string, any>>(
  obj: T,
): Partial<T> {
  return Object.entries<T>(obj)
    .filter(([, value]) => value)
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
}

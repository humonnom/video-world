export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keyToOmit: K
): Omit<T, K> => {
  const { [keyToOmit]: _, ...rest } = obj;
  return rest;
};

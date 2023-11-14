export const isBool = (value: any): boolean => {
  return typeof value === 'boolean' || typeof value === 'number' && (value === 0 || value === 1);
}

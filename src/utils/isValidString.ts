export const isValidString = (str: any): boolean => {
  return str !== null && str !== undefined && typeof str === 'string' && str.length > 0;
}

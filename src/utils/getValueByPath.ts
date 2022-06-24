export default function getValueByPath(obj: any, path: string[]): any {
  if (!obj) {
    return null;
  }
  return path.reduce((prev, key) => {
    if (prev) {
      return prev[key];
    }
    return null;
  }, obj);
}

export default function isColor(str: string) {
  return (
    typeof str === 'string' && (str.startsWith('rgb') || str.startsWith('#'))
  );
}

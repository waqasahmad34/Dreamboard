export default function removeCharsFromString(text: string): string {
  return text.replace(/_/g, ' ');
}

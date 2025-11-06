import capitalizeFirstLetter from './capitalizeFirstLetter';

export default function capitalizeEachWord(str?: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
}

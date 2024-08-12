/** Сокращает строку до указанного размер и добавляет '...' в конец строки.  */
export function shortenString(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

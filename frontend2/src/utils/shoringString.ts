/** Сокращает строку до указанного размер и добавляет '...' в конец строки.  */
export function shortenString(text: string | undefined, maxLength: number) {
  if (text) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }
}

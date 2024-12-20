import Prism from 'prismjs';
import 'prismjs/components/prism-sql';

export function highlightCode(code: string, language: string): string {
  if (!language) return code;
  
  const grammar = Prism.languages[language];
  return grammar ? Prism.highlight(code, grammar, language) : code;
}
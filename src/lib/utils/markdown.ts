import { marked } from 'marked';
import { renderSQLBlock } from './markdown/renderers/sql';
import { renderQueryReference } from './markdown/renderers/query-reference';
import { renderChart } from './markdown/renderers/chart';
import { initDatabase } from '$lib/services/database';
import { highlightCode } from './markdown/highlighter';

let dbInitialized = false;

// Create a custom renderer that handles async code blocks
const renderer = new marked.Renderer();

// Store promises to be resolved
const codePromises: Promise<string>[] = [];

renderer.code = (code: string, language: string) => {
  if (language?.startsWith('sql')) {
    const match = language.match(/sql\s+(\w+)/);
    const queryName = match ? match[1] : 'unnamed';
    
    // Create a placeholder and store the promise
    const placeholder = `__CODE_BLOCK_${codePromises.length}__`;
    codePromises.push(renderSQLBlock(code, queryName));
    return placeholder;
  }

  const highlighted = highlightCode(code, language);
  return `
    <div class="code-block">
      <pre class="language-${language}"><code>${highlighted}</code></pre>
    </div>
  `;
};

// Add text renderer to handle query references and charts
renderer.text = (text: string) => {
  return text
    .replace(/\{(\w+)\}/g, (_, queryName) => {
      return renderQueryReference(queryName);
    })
    .replace(/\{(\w+):(bar|line|pie)\}/g, (_, queryName, type) => {
      return renderChart(queryName, type);
    });
};

marked.use({ renderer });

export async function parseMarkdown(markdown: string): Promise<string> {
  // Reset promises array
  codePromises.length = 0;
  
  // Initialize database if needed
  if (!dbInitialized && typeof window !== 'undefined') {
    await initDatabase();
    dbInitialized = true;
  }
  
  // First pass: Convert markdown to HTML with placeholders
  let html = marked(markdown);
  
  // Second pass: Replace placeholders with actual rendered content
  const renderedBlocks = await Promise.all(codePromises);
  renderedBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block);
  });
  
  return html;
}